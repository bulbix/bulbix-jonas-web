import React, { useEffect, useState, useRef } from "react";
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
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { updateBook } from "../../services/bookService";
import { showDialog } from "../../utils/util";

export default function UpdateBook(props) {  
  const [filter, setFilter] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initFilter = {
      uuid: props.book?.id,
      number: props.book?.number,
      title: props.book?.title,
      author: props.book?.author,
      level: props.book?.level,
      section: props.book?.section,
      sold: props.book?.sold,
      isbndb: {},
    };
    if(initFilter.uuid !== undefined){
      setFilter(initFilter);
    }
  }, [props]);

  function handleChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeSold(){        

    if (filter.sold) {
      setFilter({
        ...filter,
        sold: false
      });  
    }
    else {
      setFilter({
        ...filter,
        sold: true
      });
    }
    
  }

  function update_book() {
    setIsLoading(true);
    try {
      updateBook(filter)
        .then((response) => {
          props.handleClose();
          showDialog("OK", "Actualizado exitosamente", "success")
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

  return (
    <Container>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="simple-dialog-title"
        fullWidth
        open={props.openModal}
      >
        <DialogTitle id="simple-dialog-title">Actualizar Libro</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack spacing={1}>
                <div>Titulo: <span style={{"color":"blue"}}>{filter !== undefined && filter.title}</span></div>
                <div>Autores: <span style={{"color":"blue"}}>{filter !== undefined && filter.author}</span></div>
                <div>Estante: <span style={{"color":"blue"}}>{filter !== undefined && filter.number}</span></div>
            </Stack>
            <Stack direction="row" spacing={2}>
              {/* <FormControl fullWidth>
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
              </FormControl> */}

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
              <FormControlLabel
                control={
                  <Switch
                    name="sold"
                    checked={filter !== undefined && filter.sold}
                    onChange={handleChangeSold}
                  />
                }
                label="Vendido"
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
         <Button color="primary" onClick={update_book}>
              Actualizar Libro
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
