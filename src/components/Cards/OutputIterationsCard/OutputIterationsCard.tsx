import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import DataGridOutput from "../../DataGrid/DataGridOutput";

export default function OutputIterationsCard() {
    return(
        <Card>
            <Typography>
                Output Iterations
            </Typography>
            <DataGridOutput/>
        </Card>
    );

}