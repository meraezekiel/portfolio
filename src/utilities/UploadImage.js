import { getEnvVars } from "../services/Environment";
const {apiUrl} = getEnvVars()
export const UploadImage = async (folderName = "test foldername", file, ApiCall, ApiMethod, fileName, type='image', service=false) => {
    try {
        // Check if folder exists
        // const folderResponse = await ApiCall({
        //     apiEndpoint: "/folders",
        //     method: "GET",
        //     token: "ZjMTgRnphnk1zhKLX8pjCaX2LQjOlAmd",
        // });

        // const existingFolder = folderResponse.data.data.find(folder => folder.name === folderName);

        // let folderId;
        // if (existingFolder) {
        //     folderId = existingFolder.id;
        // } else {
        //     // Folder doesn't exist, create a new one
        //     const createFolderResponse = await ApiCall({
        //         apiEndpoint: "/folders",
        //         method: "POST",
        //         token: "ZjMTgRnphnk1zhKLX8pjCaX2LQjOlAmd",
        //         apiData: {
        //             name: folderName,
        //         },
        //     });
        //     folderId = createFolderResponse.data.data.id;
        // }
        // Convert base64 string to Blob
        let _file = file;
        if(type == "image"){
            const base64Data = _file.split(",")[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            _file = new Blob([byteArray], { type: "image/png" });
        }

        // Append the Blob to FormData
        const formData = new FormData();
        formData.append("file", _file, fileName);
        // formData.append("folder", folderId);

        console.log("this si sthe formmdataaa", formData)
        console.log("service", service)
        // Upload the image
        const response = await ApiCall({
            apiEndpoint: "/files",
            method: ApiMethod.POST,
            apiContentType: "multipart/form-data",
            service: service,
            // token: "ZjMTgRnphnk1zhKLX8pjCaX2LQjOlAmd",
            apiData: formData,
        });

        console.log("Uploaded file ID:", response);
        return response.data.data.id;
    } catch (err) {
        console.log("service", service)
        console.log("UploadImage err", err);
        return err;
    }
};

export default function getImageUpdload(image_id){
    return `${apiUrl}/assets/${image_id}`
}