
const Formadd = () => {
    return (

        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-gray-200 rounded-xl">
                <h1 className="text-2xl font-bold">Add Employee</h1>
                <form className="flex flex-col items-center justify-center w-1/2 h-1/2">
                    <label className="text-xl font-bold">Name</label>
                    <input className="w-1/2 h-10 border-2 border-gray-300 rounded-lg" type="text" />
                    <label className="text-xl font-bold">Email</label>
                    <input className="w-1/2 h-10 border-2 border-gray-300 rounded-lg" type="text" />
                    <label className="text-xl font-bold">Phone</label>
                    <input className="w-1/2 h-10 border-2 border-gray-300 rounded-lg" type="text" />
                    <label className="text-xl font-bold">Address</label>
                    <input className="w-1/2 h-10 border-2 border-gray-300 rounded-lg" type="text" />
                    <label className="text-xl font-bold">Salary</label>
                    <input className="w-1/2 h-10 border-2 border-gray-300 rounded-lg" type="text" />
                    <label className="text-xl font-bold">Position</label>
                    <input className="w-1/2 h-10 border-2 border-gray-300 rounded-lg" type="text" />
                    <button className="w-1/2 h-10 mt-5 bg-blue-500 rounded-lg">Add</button>
                </form>
            </div>
        </div>
    )

}

export default Formadd