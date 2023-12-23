// IMPORT==================================================================================================================
// ASSETS==================================================================================================================
// COMPONENTS==============================================================================================================
// GLOBAL==================================================================================================================    
const type            = {
    "normal"          : "#A8A878",
    "fire"            : "#F08030",
    "fighting"        : "#C03028",
    "water"           : "#6890F0",
    "flying"          : "#A890F0",
    "grass"           : "#78C850",
    "poison"          : "#A040A0",
    "electric"        : "#F8D030",
    "ground"          : "#E0C068",
    "psychic"         : "#F85888",
    "rock"            : "#B8A038",
    "ice"             : "#98D8D8",
    "bug"             : "#A8B820",
    "dragon"          : "#7038F8",
    "ghost"           : "#705898",
    "dark"            : "#705848",
    "steel"           : "#B8B8D0",
    "fairy"           : "#EE99AC",
    "stellar"         : "#7CC7B2"
};
// RENDER==================================================================================================================
export function Card({item, onClick}) {
    // VARIABLES===========================================================================================================    
    return (
        <div className="flex flex-wrap justify-center rounded-md w-[12rem] font-bold shadow-md border font-sans md:m-14 mx-2 my-14 cursor-pointer" onClick={onClick}>
            <div className="h-[8rem] -mt-[7rem] items-end flex cursor-pointer">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${item.id}.gif`} alt="IMG" className="mx-auto"/>
            </div>
            <small className="w-full text-center pt-5 font-medium text-gray-500 cursor-pointer">#{item.id.toString().padStart(3, "0")}</small>
            <label className="w-full text-center pt-5 pb-3 text-ms text-gray-950 cursor-pointer capitalize">{item.name}</label>
            <div className="py-5 flex justify-center w-full cursor-pointer">
                {item.types.map((itemType, key) => {
                    return (
                        <span className="leading-4 px-3 py-1 rounded-full text-gray-100 capitalize font-medium mx-1 text-sm" style={{background: type[itemType.type.name]}} key={key}>{itemType.type.name}</span>
                    );
                })}
            </div>
        </div>
    );
}

export function CardExpand({item}) {
    // VARIABLES===========================================================================================================
    console.log(item);
    return (
        <div className="flex flex-wrap justify-center items-start rounded-md w-full font-bold shadow-md border font-sans h-[82vh]">
            <div className="-mt-[2rem] items-center flex h-[2rem]">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${item.id}.gif`} alt="IMG" className="mx-auto scale-[3]"/>
            </div>
            <div className="flex flex-wrap w-full h-[65%]">
                <h1 className="w-full text-center font-medium text-xl text-gray-500">#{item.id.toString().padStart(3, "0")}</h1>
                <label className="w-full text-center pt-5 pb-3 text-ms capitalize text-2xl">{item.name}</label>
                <div className="py-5 justify-center w-full flex">
                    {item.types.map((itemType, key) => {
                        return (
                            <span className="m-auto leading-4 px-3 py-3 rounded-full text-gray-100 capitalize font-medium mx-1 text-xl" style={{background: type[itemType.type.name]}} key={key}>{itemType.type.name}</span>
                            );
                        })}
                </div>
                <label className="w-1/2 text-center pt-5 pb-3 text-ms">{item.weight} Kg</label>
                <label className="w-1/2 text-center pt-5 pb-3 text-ms">{item.height} m</label>
                <label className="w-1/2 text-center pt-5 pb-3 text-ms">{item.base_experience} m</label>
            </div>
        </div>
    );
}