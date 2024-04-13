import { useParams } from "react-router-dom";
export const Details = () => {
  const { id } = useParams();
  return <div>this is the id : {id}</div>;
};
