import { useContext } from "react";
import { StaffContext } from "./context/StaffContext";
import Card from "./Card";
import "./Cardlist.css";

function Cardlist({ searchTerm = "" }) {
    const { staff } = useContext(StaffContext);

    const filteredstaff = staff.filter((member) => {
        return (member.name || "")
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase());
    });

    return (
        <div className="row">
            {filteredstaff.map((member) => (
                <Card
                    key={member.id || member.key}
                    image={member.image}
                    name={member.name}
                    job={member.job}
                />
            ))}
        </div>
    );
}

export default Cardlist;
