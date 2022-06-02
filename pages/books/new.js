import React, {useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import {addBook, consultIsbn} from "../../services/bookService"
import {Button, Grid} from "@material-ui/core";

export default function NewBook(){

  const initFilter = {
      isbn : '',
      number : 0,
      title: '',
      author: '',
      level: 0,
      section: ''
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

  function searchIsbn(){
      try {
      consultIsbn(filter.isbn)
        .then((response) => {
                 setFilter({
                    ...filter,
                     title: response.data.book.title,
                     author: response.data.book.authors.join('|')
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
      prepareRequest()
      setIsLoading(true);
    try {
      addBook(filterRequest)
        .then((response) => {
          showDialog()
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
      width: '600px',
      heightAuto: true,
      showConfirmButton: true,
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#333",
    }).then(() => {
         setFilter({
            ...filter,
             isbn: '',
             title: '',
             author:''
        });

    });
  }

  return (
    <div style={{width: '100%' }}>
       <br/>

        <TextField label="ISBN" variant="outlined" id="standard-basic" type="number"
                   value={filter !== undefined && filter.isbn} name="isbn" onChange={handleChange} autoFocus />


                        <Button
                            style={{ marginLeft: 20, width: 200, borderRadius: 50, background: '#ffffff', marginBlock: '5px' }}
                            variant="contained"
                            onClick={searchIsbn}>
                            Consultar Libro
                        </Button>


        <br/>

      <TextField label="Titulo" variant="outlined" id="standard-basic"
                   value={filter !== undefined && filter.title} name="title"
                   onChange={handleChange} />

      <TextField label="Autor" variant="outlined" id="standard-basic"
                   value={filter !== undefined && filter.author} name="author"
                   onChange={handleChange} />

        <TextField label="Estante" variant="outlined" id="standard-basic" type="number"
                   value={filter !== undefined && filter.number} name="number"
                   onChange={handleChange} />

         <TextField label="Nivel" variant="outlined" id="standard-basic" type="number"
                   value={filter !== undefined && filter.level} name="level"
                   onChange={handleChange} />

         <TextField label="Seccion" variant="outlined" id="standard-basic"
                   value={filter !== undefined && filter.section} name="section"
                   onChange={handleChange} />

          <Grid container md={6} justify="center" >
                        <Button
                            style={{ marginLeft: 20, width: 200, borderRadius: 50, background: '#ffffff', marginBlock: '5px' }}
                            variant="contained"
                            onClick={newBook}>
                            Agregar Libro
                        </Button>
                    </Grid>

    </div>
  );
}
