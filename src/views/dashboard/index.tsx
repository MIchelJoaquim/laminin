
import { FC } from "react";
import Table from "../../components/table";
import { HeadCell } from "../../components/table/table.types";

const Dashboard: FC = ()=>{
    const headCells:HeadCell[] = [
        {label: "Name", id: "name"},
        {label: "Calories", id: "calories"},
        {label: "Fat", id: "fat"},
        {label: "Carbs", id: "carbs"},
        {label: "Protein", id: "protein"},
    ];

    function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
      
    return (
    <>
        <h1>DASHBOARD</h1>
        <Table headCells={headCells} rows={rows}/>
    </>
    )
}

export default Dashboard;