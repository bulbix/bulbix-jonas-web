import React, { useState } from "react";
import { addBook, consultIsbn } from "../../services/bookService";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Container,
  Stack,
  InputLabel,
  FormControl,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { showDialog } from "../../utils/util";

export default function NewBook() {
  const initFilter = {
    isbn: "",
    isbn_strjson: "",
    isbn_object: {},
    number: 1,
    title: "",
    author: "",
    level: 1,
    section: "adelante",
  };

  const [filter, setFilter] = useState(initFilter);
  const [filterRequest, setFilterRequest] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  function handleChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  function searchIsbn() {
    try {
      consultIsbn(filter.isbn)
        .then((response) => {
          if (response.data.errorMessage !== "Not Found") {
            setFilter({
              ...filter,
              title: response.data.book.title,
              author: response.data.book.authors.join("|"),
              isbn_object: response.data.book,
              isbn_strjson: JSON.stringify(response.data.book, null, 2),
            });
            setOpenModal(true);
          } else {
            showDialog("Oops", "No encontramos ISBN capture a mano por favor", "warning")
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (e) {
      console.error(e);
    }
  }

  function prepareRequest() {
    setFilterRequest({});
    if (filter !== undefined) {
      filterRequest.number = parseInt(filter.number);
      filterRequest.title = filter.title;
      filterRequest.author = filter.author;
      filterRequest.sold = false;
      filterRequest.level = parseInt(filter.level);
      filterRequest.section = filter.section;
      filterRequest.isbndb = filter.isbn_object;
      filterRequest.uuid = '' 
    }
  }

  function newBook(event) {
    event.preventDefault();
    prepareRequest();
    setIsLoading(true);
    try {
      addBook(filterRequest)
        .then((response) => {
          showDialog("OK", "Agregado exitosamente", "success", ()=>{
            setFilter({
              ...filter,
              isbn: "",
              title: "",
              author: "",
            });
          });
        })
        .catch((error) => {
          showDialog("FAIL", "Oops algo fallo", "error")
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (e) {
      console.error(e);
    }
  }

  function handleClose(){
      setOpenModal(false);
  }

  return (
    <Container
      sx={{
        background: "whitesmoke",
        width: "100%",
        height: "350px",
        borderRadius: "16px",
      }}
    >
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={openModal}
        fullWidth
      >
        <DialogTitle id="simple-dialog-title">ISBN</DialogTitle>
        <DialogContent>
          {filter !== undefined && filter.isbn_strjson && (
            <pre>{filter.isbn_strjson}</pre>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <form onSubmit={newBook}>
      <Stack spacing={2} marginTop="10px">
        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            fullWidth
            label="ISBN"
            placeholder="Buscar ISBN"
            variant="outlined"
            type="number"
            value={filter !== undefined && filter.isbn}
            name="isbn"
            onChange={handleChange}
            autoFocus
          />
          <IconButton
            onClick={searchIsbn}
            sx={{
              left: "-60px",
            }}
          >
            <SearchIcon></SearchIcon>
          </IconButton>
        </Stack>

        <TextField
          label="Titulo"
          placeholder="Registre Titulo"
          required={true}
          variant="outlined"
          value={filter !== undefined && filter.title}
          name="title"
          onChange={handleChange}
        />

        <TextField
          label="Autores"
          placeholder="Registre Autores, separe con el caracter pipe |"
          required={true}
          variant="outlined"
          id="standard-basic"
          value={filter !== undefined && filter.author}
          name="author"
          onChange={handleChange}
        />

        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="number">Estante</InputLabel>
            <Select
              id="number"
              value={filter !== undefined && filter.number}
              label="Estante"
              name="number"
              onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="level">Nivel</InputLabel>
            <Select
              id="level"
              value={filter !== undefined && filter.level}
              label="Nivel"
              name="level"
              onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="section">Seccion</InputLabel>
            <Select
              id="section"
              value={filter !== undefined && filter.section}
              label="Seccion"
              name="section"
              onChange={handleChange}
            >
              <MenuItem value={"atras"}>atras</MenuItem>
              <MenuItem value={"adelante"}>adelante</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button variant="contained" type="submit">
          Agregar Libro
        </Button>
      </Stack>
      </form>
    </Container>
  );
}
