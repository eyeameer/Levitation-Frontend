import { useAppSelector } from "../../store/store"
import FormComponent from "./homePageComponents/FormComponent"
import TableComponent from "./homePageComponents/TableComponent"
import { ToastContainer } from 'react-toastify';
import { Loader } from "../../components/Loader";
export default function HomePage() {

    const { loading } = useAppSelector((state) => state.form)
    return (
        <div className="mt-[2%]">
            {loading && <Loader />}
            <div className="mx-[6%] flex items-center justify-between gap-4">
                <div className="font-metroBold text-xl sm:text-3xl">Your Submissions:</div>
                <FormComponent />
            </div>
            <TableComponent />
            <ToastContainer />
        </div>
    )
}