import React, { useEffect, useState } from "react";
import { Container, TextField, Stack, IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import { searchBook } from "../../services/bookService";
import SearchIcon from "@mui/icons-material/Search";
import NewBook from "./new";

export default function ReportBooks() {
  const initFilter = {
    query: "",
  };

  const [data, setData] = useState(undefined);
  const [filter, setFilter] = useState(initFilter);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { field: "id", headerName: "Id", width: 200, hide: true },
    { field: "title", headerName: "Titulo", width: 450 },
    { field: "author", headerName: "Autores", width: 400 },
    { field: "number", headerName: "Estante", width: 70 },
    { field: "level", headerName: "Nivel", width: 70 },
    { field: "section", headerName: "Seccion", width: 80 },
  ];

  function handleChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  function searchBooks() {
    if (filter !== undefined) {
      var query = filter.query;
      setIsLoading(true);
      try {
        searchBook(query)
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

  return (
    <Container>
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
