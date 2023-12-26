// IMPORT==================================================================================================================
import { useState, useEffect, Fragment }                                        from "react";
import axios                                                                    from "axios";
// ASSETS==================================================================================================================
// COMPONENTS==============================================================================================================
// GLOBAL==================================================================================================================    
const type              = {
    "normal"            : "#A8A878",
    "fire"              : "#F08030",
    "fighting"          : "#C03028",
    "water"             : "#6890F0",
    "flying"            : "#A890F0",
    "grass"             : "#78C850",
    "poison"            : "#A040A0",
    "electric"          : "#F8D030",
    "ground"            : "#E0C068",
    "psychic"           : "#F85888",
    "rock"              : "#B8A038",
    "ice"               : "#98D8D8",
    "bug"               : "#A8B820",
    "dragon"            : "#7038F8",
    "ghost"             : "#705898",
    "dark"              : "#705848",
    "steel"             : "#B8B8D0",
    "fairy"             : "#EE99AC",
    "stellar"           : "#7CC7B2"
};
// RENDER==================================================================================================================
export function Card({item, onClick, setLoading}) {
    // VARIABLES===========================================================================================================    
    // USEEFFECT===========================================================================================================
    useEffect(() => {
        if(item.id === 151){
            setLoading(false);
        }
    }, []);
    return (
        <div className="flex flex-wrap justify-center rounded-md w-[12rem] h-[12rem] font-bold shadow-md border text-xl md:m-14 mx-2 my-14 hover:scale-110 transition duration-300 cursor-pointer object-cover" onClick={onClick}>
            <div className="h-[8rem] -mt-[7rem] items-end flex cursor-pointer">
                <img src={require(`../assets/img/${item.id}.gif`)} alt="IMG" className="mx-auto"/>
            </div>
            <small className="w-full text-center pt-5 font-bold text-gray-400 cursor-pointer">#{item.id.toString().padStart(3, "0")}</small>
            <label className="w-full text-center pt-5 pb-1 text-ms text-gray-600 cursor-pointer capitalize text-2xl">{item.name}</label>
            <div className="py-5 flex justify-center w-full cursor-pointer">
                {item.types.map((itemType, key) => {
                    return (
                        <span className="leading-4 px-3 py-1 rounded-full text-gray-100 capitalize font-medium mx-1 text-md" style={{background: type[itemType.type.name]}} key={key}>{itemType.type.name}</span>
                    );
                })}
            </div>
        </div>
    );
}

export function CardExpand({item}) {
    // VARIABLES===========================================================================================================
    const [description, setDescription]     = useState("");
    const [loading, setLoading]             = useState(false);
    // USEEFFECT===========================================================================================================
    useEffect(() => {
        const requestGetPokemon             = async () => {
            try{
                setLoading(true);
                
                let request                 = await axios({
                    method                  : "get",
                    url                     : `https://pokeapi.co/api/v2/pokemon-species/${item.id}`
                });

                if(request.status !== 200){
                    console.log(request);
                    return;
                }
    
                for(let text of request.data["flavor_text_entries"]){
                    if(text.language.name === "en" && text.version.name === "red"){
                        setDescription(text.flavor_text.replace(/\n/g, " ").replace(/\f/g, " "));
                        break;
                    }
                }

                setLoading(false);

            }catch(exception){
                console.log(exception);
                return;
            }
        };

        requestGetPokemon();
    }, [item]);

    return (      
        <>
            {loading ? 
                    <div className="flex justify-center items-center h-[70vh] animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" className="animate-spin" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c4.08 0 7.45 3.05 7.94 7h-4.06c-.45-1.73-2.02-3-3.88-3s-3.43 1.27-3.87 3H4.06C4.55 7.05 7.92 4 12 4" opacity=".3"/><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 2c4.08 0 7.45 3.05 7.94 7h-4.06c-.45-1.73-2.02-3-3.88-3s-3.43 1.27-3.87 3H4.06C4.55 7.05 7.92 4 12 4m2 8c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m-2 8c-4.08 0-7.45-3.05-7.94-7h4.06c.44 1.73 2.01 3 3.87 3s3.43-1.27 3.87-3h4.06c-.47 3.95-3.84 7-7.92 7"/></svg>
                    </div>
                :
                    <div className="flex flex-wrap justify-center items-start rounded-md w-full font-bold shadow-md border h-[78vh]">
                        <div className="-mt-[2rem] items-center flex h-[2rem]">
                            <img src={require(`../assets/img/${item.id}.gif`)} alt="IMG" className="mx-auto scale-[3]"/>
                        </div>
                        <div className="w-full h-[65%]">
                            <h1 className="text-center font-bold text-gray-400 text-2xl">#{item.id.toString().padStart(3, "0")}</h1>
                            <h1 className="text-center py-1 text-ms capitalize text-4xl text-gray-600">{item.name}</h1>
                            <div className="py-5 justify-center w-full flex">
                                {item.types.map((itemType, key) => {
                                    return (
                                        <span className="m-auto leading-4 px-6 py-2 rounded-full text-gray-100 capitalize font-medium mx-2 text-2xl" style={{background: type[itemType.type.name]}} key={key}>{itemType.type.name}</span>
                                    );
                                })}
                            </div>
                            <div className="w-full flex flex-wrap justify-center">
                                <label className="w-1/6 text-center text-gray-600 text-2xl">{item.weight} Kg</label>
                                <label className="w-1/6 text-center text-gray-600 text-2xl">{item.height} m</label>
                            </div>
                            <p className="text-gray-600 px-20 py-8 text-2xl">
                                {description}
                            </p>
                            <div className="w-full flex flex-wrap justify-center text-gray-600 uppercase text-2xl">
                                {item.stats.map((itemStats, key) => {
                                    return(
                                        <Fragment key={key}>
                                            <div className="px-10 py-2 w-1/2 text-end">
                                                {itemStats.stat.name}
                                            </div>
                                            <div className="px-10 py-2 w-1/2">
                                                {itemStats.base_stat}
                                            </div>
                                            {itemStats.stat.name !== "speed" && <hr className="w-[60%]"/>}                                            
                                        </Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
            }
        </>        
    );
}