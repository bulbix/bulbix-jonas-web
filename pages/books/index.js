import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import {searchBook} from "../../services/bookService"

export default function ReportBooks(){

  const initFilter = {
    author : '',
    title: ''
  };

  const [data, setData] = useState(undefined)
  const [filter, setFilter] = useState(initFilter);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
      { field: "id", headerName: "Id", width:200, hide:true},
      { field: "number", headerName: "Estante", width:130},
      { field: "title", headerName: "Titulo", width:400},
      { field: "author", headerName: "Autor", width:400},
      { field: "level",  headerName: "Nivel", width:120},
      { field: "section", headerName: "Seccion", width:130}
  ];

  function handleChange(e) {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value,
        });
  }

  useEffect(() => {
      if(filter !== undefined) {
          searchBooks(filter.title, filter.author)
      }
    }, [filter])

  function searchBooks(title, author) {
    setIsLoading(true);
    try {
      searchBook(title,author)
        .then((response) => {
          setData(response.data)
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

  return (
    <div style={{width: '100%' }}>
       <br/>
      <TextField label="Titulo" variant="outlined" id="standard-basic"
                   value={filter !== undefined && filter.title} name="title"
                   onChange={handleChange} />

      <TextField label="Autor" variant="outlined" id="standard-basic"
                   value={filter !== undefined && filter.author} name="author"
                   onChange={handleChange} />

      {data !== undefined && (
        <DataGrid
          loading={isLoading}
          columns={columns}
          autoHeight={true}
          rows={data}
        />
      )}
    </div>
  );
}
