import React, { useState } from "react";
import Swal from "sweetalert2";
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
} from "@mui/material";

export default function NewBook() {
  const initFilter = {
    isbn: "",
    number: 1,
    title: "",
    author: "",
    level: 1,
    section: "forward",
  };

  const [filter, setFilter] = useState(initFilter);
  const [filterRequest, setFilterRequest] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
          setFilter({
            ...filter,
            title: response.data.book.title,
            author: response.data.book.authors.join("|"),
          });
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
    }
  }

  function newBook() {
    prepareRequest();
    setIsLoading(true);
    try {
      addBook(filterRequest)
        .then((response) => {
          showDialog("Agregado exitosamente!");
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

  function showDialog(title = "Exito!", text = "", icon = "success") {
    Swal.fire({
      title: title,
      width: "600px",
      heightAuto: true,
      showConfirmButton: true,
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#333",
    }).then(() => {
      setFilter({
        ...filter,
        isbn: "",
        title: "",
        author: "",
      });
    });
  }

  return (
    <Container
      sx={{
        background: "whitesmoke",
        width: "80vw",
        height: "350px",
        borderRadius: "16px",
        marginTop: "40px",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} marginTop="10px">
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="ISBN"
            variant="outlined"
            type="number"
            value={filter !== undefined && filter.isbn}
            name="isbn"
            onChange={handleChange}
            autoFocus
          />
          <Button variant="contained" onClick={searchIsbn}>
            Consultar Libro
          </Button>
        </Stack>

        <TextField
          label="Titulo"
          variant="outlined"
          value={filter !== undefined && filter.title}
          name="title"
          onChange={handleChange}
        />

        <TextField
          label="Autor"
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
              <MenuItem value={"backward"}>backward</MenuItem>
              <MenuItem value={"forward"}>forward</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button variant="contained" onClick={newBook}>
            Agregar Libro
          </Button>
      </Stack>
    </Container>
  );
}
