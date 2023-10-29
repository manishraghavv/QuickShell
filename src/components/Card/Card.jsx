import React from 'react'
import './Card.css';

const Card = ({ data, id, title, tag, status }) => {
    // console.log(data,id,title,tag,status)
    let userStatus = (data?.useravailable) ? "green" : "yellow"
    return (
        <div className="cardContainer flex-gap-10" style={{ gap: '5px' }}>
            <div className="cardHeading flex-sb">
                <span style={{ textTransform: "uppercase" }} className='color-grey'>{id}</span>
                <div className="imageContainer relative" style={{ width: "30px", height: "30px" }}>
                    <div class="profileImage">

                        {
                            data?.username?.split(" ")?.length >= 2 ?
                                data?.username?.split(" ")[0][0].toUpperCase() +
                                data?.username?.split(" ")[data?.username?.split(" ").length - 1][0].toUpperCase()
                                :
                                data?.username?.split(" ")[0][0].toUpperCase()
                        }

                    </div>
                    <div className="showStatus" style={{background: userStatus}}></div>
                </div>
            </div>
            <div className="cardTitle" style={{ fontWeight: 200 }} >
                <p>{title}</p>
            </div>
            <div className="cardTags">
                <div className="tags color-grey"> ... </div>
                {
                    tag?.map((elem, index) => {
                        return <div key={index} className="tags color-grey"> <span>•</span> {elem}</div>
                    })
                }
            </div>
        </div>
    )
}

export default Card;