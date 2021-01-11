import {useState} from "react";
import axios from "axios";

const ACCOUNT_REST_API_URL = 'http://localhost:8081/upload/'

export default function UploadComponent() {
    const [card, setCard] = useState({
        //ArticleProps
        articleId: 0,
        languageCode: '',
        comment: '',
        price: 0,
        quantity: 0,
        inShoppingCart: false,
        seller: '',
        lastEdited: '',
        condition: '',
        foil: false,
        signed: false,
        altered: false,
        playset: false,
        //ProductProps
        productId: 0,
        metaproductId: 0,
        totalReprints: 0,
        name: '',
        language: '',
        productName: '',
        categoryId: 0,
        categoryName: '',
        slefUrl: '',
        imageUrl: '',
        game: '',
        expansionCollectionNumber: '',
        rarity: '',
        expansionName: '',
        dateAdded: '',
    })
    const [cardList, setCardList] = useState([])
    const [file, setFile] = useState('')
    const [progress, setProgress] = useState(0)

    const handleFileChange = (event) => {
        setProgress(0)
        const file = event.target.files[0]
        setFile(file)
    }

    const uploadFile = () => {
        const formData = new FormData()
        formData.append('file', file)
        axios.post(ACCOUNT_REST_API_URL, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100);
                setProgress(progress);
            }
        }).then(res => {
            console.log(res);
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <div className="file-upload">
                <input type="file" onChange={handleFileChange} />
                <div className="bg-info" style={{ width: progress }}>
                    {progress}
                </div>
                <button onClick={uploadFile} className="bg-primary">
                    Upload
                </button>
                <hr />
            </div>
        </div>
    );

}