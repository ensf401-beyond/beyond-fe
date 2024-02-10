import { DummyData } from "../data/DummyData";
import GridCard from "./ui/GridCard";

type GridItem = {
    name: string,
    image: string
}

function Grid() {
    return(
        <div id="grid-container">
            {DummyData.map((val: GridItem, key: any) => (
            <GridCard name={val.name} image={val.image} />
          ))}
        </div>
    )
}

export default Grid;