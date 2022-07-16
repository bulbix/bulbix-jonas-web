import React, { useEffect, useState } from "react";
import { Container, TextField, Stack, IconButton, Switch, FormControlLabel, Link } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import { searchBook } from "../../services/bookService";
import SearchIcon from "@mui/icons-material/Search";
import NewBook from "../../components/books/new";
import UpdateBook from "../../components/books/update";
import { useSession, signIn, signOut } from "next-auth/react"

export default function JonasBooks() {
  const initFilter = {
    query: "",
    sold: false
  };

  const { data: session } = useSession()
  const [data, setData] = useState(undefined);
  const [filter, setFilter] = useState(initFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [book, setBook] = useState(undefined);

  const columns = [
    { field: "id", headerName: "Id", width: 200, hide: true },
    { field: "title", headerName: "Titulo", width: 450,
    renderCell: (cellValues) => {
        return (
          <Link            
          onClick={() => updateBook(cellValues.row)}
          component="button"
          variant="body2">
            {cellValues.row.title}
          </Link>
        );
      }
    },
    { field: "author", headerName: "Autores", width: 400 },
    { field: "number", headerName: "Estante", width: 70 },
    { field: "level", headerName: "Nivel", width: 70 },
    { field: "section", headerName: "Seccion", width: 80 },
    { field: "sold", headerName: "Vendido", width: 80 },
  ];

  function updateBook(row){
    console.log(row);
    setOpenModal(true);
    setBook(row)
  }

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

  function searchBooks() {
    if (filter !== undefined) {
      var query = filter.query;
      setIsLoading(true);
      try {
        searchBook(query, filter.sold)
          .then((response) => {
            setData(response.data);
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
  }

  function handleClose(){
    setOpenModal(false);
  }

  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Iniciar Sesión</button>
      </>
    )
  }
  else{
    if(session.user.email != "lfpradof@gmail.com" && session.user.email != "pradoluix@gmail.com"){
      return (
        <>
          <h1>No Autorizado</h1>
        </>
      )
    }
  }

  return (
    <Container>

    <div>Bienvenido, <span style={{"color":"blue"}}>{session?.user.name} - {session?.user.email} </span> <button onClick={() => signOut()}>Cerrar Sesión</button></div>
   
    <br />
    
    <UpdateBook openModal={openModal} handleClose={handleClose} book={book}></UpdateBook>

    <Stack spacing={2}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Agregar Libro</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NewBook />
        </AccordionDetails>
      </Accordion>

      <Stack direction="row" spacing={2}>
        <TextField
          autoFocus
          fullWidth
          size="small"
          label="Buscar Libro"
          placeholder="Busca por titulo o autor"
          variant="outlined"
          value={filter !== undefined && filter.query}
          name="query"
          onChange={handleChange}
        />
        <IconButton
          onClick={searchBooks}
          sx={{
            left: "-60px",
          }}
        >
          <SearchIcon></SearchIcon>
        </IconButton>
        <FormControlLabel control={<Switch 
        name="sold"
        checked={filter !== undefined && filter.sold}
        onChange={handleChangeSold}
        />} label="Vendidos" />
      </Stack>

      {data !== undefined && (
        <DataGrid
          loading={isLoading}
          columns={columns}
          autoHeight={true}
          rows={data}
        />
      )}
      </Stack>
    </Container>
  );
}
