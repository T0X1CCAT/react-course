export function authorsFormattedForDropdown( authors ) {
    return authors.map(author => {
        return {
        text: author.firstName + ' ' + author.lastName,
        value: author.id
        };
    });
}
