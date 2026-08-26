import { NavLink } from "react-router-dom";


interface bookProps {
    id: number;
    image: string;
    title:string;
    price: number;
}

const BookCard = ({id,image,title,price}: bookProps) => {
  return (
    <div className="border p-4 rounded">

        <NavLink to={`/product/${id}`}>
            <img src={image} alt={title}  className="w-full h-32 object-cover mb-2"/>
        </NavLink>
        <h2 className="font-semibold">{title}</h2>
        <p>${price}</p>
    </div>
  )
}

export default BookCard