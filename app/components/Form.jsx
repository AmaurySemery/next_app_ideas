export default function Form({ formTitle }) {
    return (
        <div className="form-container">
            <h3 className='form-header'>{formTitle}</h3>
            <form action="form">
                <label htmlFor="title">Idea Title</label>
                <input type="text" id="title" />

                <label htmlFor="description">Idea Description</label>
                <textarea name="description" id="description" cols="30" rows="5">
                    <input type="submit" value="Create" className="btn" />
                </textarea>
            </form>
        </div>
    )
}