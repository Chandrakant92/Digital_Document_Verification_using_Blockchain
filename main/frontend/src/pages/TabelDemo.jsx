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
import { Icon, Input, InputGroup, InputLeftElement, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';
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
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    setRowData(props.data);
    console.log("d", props.data);
  }, [props])


  const verifiedCellRenderer = (params) => {
    return <Icon
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
    />
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { headerName: 'S.N', field: 'id', width: 100, },
    { headerName: 'Document', field: 'document' },
    { headerName: 'University', field: 'university' },
    { headerName: 'IPFS CID', field: 'ipfs_cid' },
    { headerName: 'Verified', field: 'verified', cellRenderer: verifiedCellRenderer,}
  ]);


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
        // frameworkComponents={{
        //   iconComponent: IconComponent
        // }}
        />
      </div>
      </div>
    </div>
  );
};
export { TabelDemo };