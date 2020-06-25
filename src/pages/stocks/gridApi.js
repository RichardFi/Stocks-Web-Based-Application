import React, { useState, useCallback } from "react";

export default function useAgGrid() {
    const [gridApi, setGridApi] = useState();
    const onGridReady = useCallback(
      (params) => {
        const { api, columnApi } = params;
        setGridApi({ api, columnApi });
      },
      []
    );
    return {
      onGridReady,
      ...gridApi && gridApi
    };
  }