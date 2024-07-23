class FileChecker {
    
    // Image Checker (JPEG, JPG, PNG)
    static ImageChecker = (input) => {
        if (input) {
            if (/(image\/jpeg|image\/jpg|image\/png)/.test(input.type)) {
                return true;
            } else {
                alert('Please Upload Valid Image File Format (JPEG, JPG or PNG)')
            }
        } else {
            alert('Please Upload Image File!')
        }
    } 
}

export default FileChecker;