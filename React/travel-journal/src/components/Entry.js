import React from "react";
import { ImLocation } from "react-icons/im"

export default function Entry(props) {
  return (
    <div className="entry">
      <img src={props.imageUrl} alt={props.title} />
      <div className="content">
        <div className="location">
          <ImLocation size={10} color="#F55A5A" />
          <span>{props.location.toUpperCase()}</span>
          <a href={props.googleMapsUrl} className="maps">View on Google Maps</a>
        </div>
        <h2>{props.title}</h2>
        <h4>{`${props.startDate} - ${props.endDate}`}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  )
}