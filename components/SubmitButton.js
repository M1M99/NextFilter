export default function SubmitButton({children}){
    return <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {children}
    </button>
}