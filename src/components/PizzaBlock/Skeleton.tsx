import React from "react"
import ContentLoader from "react-content-loader"


const Skeleton: React.FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="-1" y="271" rx="10" ry="10" width="280" height="22" />
        <circle cx="135" cy="130" r="125" />
        <rect x="0" y="309" rx="5" ry="5" width="280" height="66" />
        <rect x="1" y="407" rx="10" ry="10" width="104" height="45" />
        <rect x="128" y="400" rx="29" ry="29" width="149" height="54" />
    </ContentLoader>
)

export default Skeleton