import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
  useEffect,
} from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { Flex, Icon, Input, InputGroup, InputLeftElement, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

// Create new GridExample component
const TabelDemo = (props) => {
  const { colorMode } = useColorMode();

  const theme = colorMode === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

  const customCSS = `
    .ag-theme-quartz-dark {
      --ag-background-color: transparent; /* Change this to the desired color */
      --ag-header-background-color:#1B254B;
    }
    
  `;

  const containerStyle = useMemo(() => ({ width: '100%', height: '200px' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  


  const gridRef = useRef();

  const uploadColor = useColorModeValue("brand.500", "white");

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState();


  useEffect(() => {
    if (props.data && props.headers) {
      const columnDefs = props.headers.map((header,index) => ({
        headerName: header,
        field: `field_${index}`,
        
        cellRenderer: header === 'Verified' ? verifiedCellRenderer : undefined,
      }));

      const rowData = props.data.map((rowDataItem, index) => {
        if(rowDataItem.length>0){
        const rowObj = {};
          rowDataItem.forEach((item, colIndex) => {
          const field = `field_${colIndex+1}`; 
          rowObj[field] = item;
        });
      
        rowObj[`field_0`] =  index; 
      
        return rowObj;
      }
      });
      
      setColDefs(columnDefs);
      setRowData(rowData);
    }
  }, [props.data, props.headers]);



  const verifiedCellRenderer = (params) => {
    return (<Flex justifyContent='center'><Icon
      w='24px'
      h='24px'
      me='5px'
      color={
        params.value == 'true' ? 
            "green"
            :  "red"
          }
      as={
        params.value == 'true' ? 
              MdCheckCircle
            :  MdCancel
         }
    /> </Flex>)
  };

  // Column Definitions: Defines & controls grid columns.


  const autoSizeStrategy = useMemo(() => {
    return {
    //  type: 'fitGridWidth',
      //defaultMinWidth: 100,
      // columnLimits: [
      //   {
      //     colId: 'country',
      //     minWidth: 900,
      //   },
      // ],
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      'quickFilterText',
      document.getElementById('filter-text-box').value
    );
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div>
      <style>{customCSS}</style>
      <Stack spacing={10} w='200px' mb='5'>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color={uploadColor}
            children={<FaSearch />}
          />
          <Input size='md' variant='auth' placeholder="Search Document"
            onChange={onFilterTextBoxChanged}
            type="text"
            id="filter-text-box"


          />
        </InputGroup>
      </Stack>
      <div style={containerStyle}>
      <div
        className={
          theme
        }
        style={gridStyle}
      >
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={colDefs} 
        autoSizeStrategy={autoSizeStrategy}
       
        />
      </div>
      </div>
    </div>
  );
};
export { TabelDemo };