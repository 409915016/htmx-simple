const createEditFormTemplate = (book) => /*html*/ `
    <form>
        <input type="text" name="title" placeholder="title" required value="${ book.title }">
        <input type="text" name="author" placeholder="author" required value="${ book.author }">
        <button>Save</button>
    </form>
`

export default createEditFormTemplate