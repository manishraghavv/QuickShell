import React from "react";
import { useSelector } from "react-redux";
// import { DiCodeigniter } from "react-icons/di";
import { AiOutlinePlus } from "react-icons/ai";
import "./DashView.css";
import Card from "../Card/Card";

const DashView = () => {
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );
    console.log(selectedData, user,".......................")
  return (
    selectedData && (
      <div className="dashContainer" style={{ justifyContent: "space-evenly" }}>
        {selectedData.map((elem, index) => {
          return (
            <>
              <div key={index} className="dashCardContainer">
                <div className="dashCardHeading flex-sb">
                  <div className="leftView">
                    {!user ? (
                      // <DiCodeigniter />
                      ""
                    ) : (
                      <>
                        <div
                          className="imageContainer relative"
                          style={{ width: "30px", height: "30px", display : 'inline-block' }}
                        >
                          <div id="profileImage">
                            {
                              elem[index]?.title?.split(" ")?.length >= 2 ?
                              elem[index]?.title?.split(" ")[0][0].toUpperCase() + 
                              elem[index]?.title?.split(" ")[elem[index]?.title?.split(" ").length-1][0].toUpperCase()
                              :
                              elem[index]?.title?.split(" ")[0][0].toUpperCase()
                            }
                          </div>
                        </div>
                      </>
                    )}
                    <span>
                      {" "}
                      {elem[index]?.title} {elem[index]?.value?.length}
                    </span>
                  </div>
                  <div className="rightView">
                    <AiOutlinePlus />{" "}
                    <span style={{ letterSpacing: "2px" }}>...</span>
                  </div>
                </div>
                <div className="dashList flex-gap-10">
                  {elem[index]?.value?.map((elem, ind) => {
                    return (
                      <Card data={elem} id={elem.id} title={elem.title} tag={elem.tag} />
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    )
  );
};

export default DashView;
