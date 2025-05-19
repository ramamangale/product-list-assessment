import React from 'react';
import { ButtonGroup, Button } from '@mui/material';


function ListView(props: any) {
    const { rows = [], loading, columns = [], handleSort, gridViewRender } = props;
    const [mode, setMode] = React.useState('grid');

    const toggleView = () => mode !== 'grid' ? setMode('grid') : setMode('table');

    const renderGridView = () => {
        return (<div className="grid-container">
            {rows.map((item: any, index: number) => {
                const keys: any = {};
                columns.forEach((itemC: any) => keys[itemC.field] = item[itemC.field]);
                return <div className="grid-item" key={index}>{gridViewRender(keys, index)}</div>
            })}
        </div>);
    }

    const tableView = () => {
        return <table>
            <tr>
                {columns.map((item: any, index: number) => {
                    return <th key={index} style={{width: `${item.width}px` }}>{item.headerName}</th>
                })}
            </tr>
            {rows.map((item: any, index: number) => {
                return <tr key={index}>
                    {columns.map((itemC: any, index: number) => {
                        if (itemC.isImageUrl) {
                            return <td key={index} style={{width: `${item.width}px` }}>
                                <img src={item[itemC.field]} alt={item.title} loading='lazy' width={itemC.imageProperties.width} height={itemC.imageProperties.height} />
                            </td>
                        }
                        return <td key={index} style={{width: `${item.width}px` }}>
                            {item[itemC.field]}
                        </td>
                    })}
                </tr>
            })}
        </table>
    }

    if (loading) {
        return <div className='loader'>Loading....</div>
    }

    return (
        <>
            <div className='filter-section'>
                <div>Sort By Price</div>
                <ButtonGroup
                    variant="contained"
                    aria-label="button group"
                    sx={{ marginLeft: 2 }}
                >
                    <Button onClick={() => handleSort('price', 'desc')}>High</Button>
                    <Button onClick={() => handleSort('price', 'asc')}>Low</Button>
                </ButtonGroup>
                <Button variant="outlined" sx={{ marginLeft: 2 }} onClick={toggleView}>{mode !== 'grid' ? 'grid' : 'table'}</Button>
            </div>
            {mode === 'grid' ? renderGridView() : tableView()}
        </>
    )
}

export default ListView