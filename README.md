# Ebook-Editor
The project aims at developing a web application which can be used for creating dynamic
eBooks. Dynamic e-books are e-books where you can interact with the content of the book.
Playing the media files (audio or video), viewing the images in a gallery or creating a slideshow
out of it, adding different animations to the content etc. Apple’s IBooks Author is an app that do
just the same. Have a look https://www.youtube.com/watch?v=pr076C_ty_M.

About the Application

The app includes an index.html file, a style.css file, an ebook_editor.js file, an ebookServer.js
server side script for storing media files, ebook.js a javascript file that will be included in the
final product to render the eBook correctly. Ebooks created will be rendered in EPUB format.

index.html

It displays the basic framework that user will use to create and edit eBooks. It contains a header
div that holds the toolbar and widgetbar. Toolbar contains buttons for editing text selections.
Widgetbar provides with some of the widgets discussed above which includes new page, new
button for inserting textbox, image, video, slideshow and table. table button is not functional.

ebook_editor.js

It is the main script that provides functionality to the editor.

ebookServer.js

It is used for creating a server using expressJS(a nodeJS framework) to render the application on
web and to save the media files uploaded by the user in the respective folders. For file
uploading multer is used a nodejs middleware for handling multipart/formdata.

