// IMPORT==================================================================================================================
import axios from "axios";
import { useState, useEffect }                                                  from "react";
// ASSETS==================================================================================================================
import arrow                                                                    from "../assets/img/arrows/arrow.png";
// COMPONENTS==============================================================================================================
// RENDER==================================================================================================================
export function Pokedex({ up, down }) {
    // VARIABLES===========================================================================================================
    const [list, setList]               = useState([]);
    const [type, setType]               = useState({});
    const [selectId, setSelectId]       = useState(1);
    const [isTop, setIsTop]             = useState(1);
    const requestGetPokemon             = async () => {
        try{
            let data                    = [];

            for(let i = 1; i < 152; i++){
                let request             = await axios({
                    method              : "get",
                    url                 : `https://pokeapi.co/api/v2/pokemon/${i}`
                });

                if(request.status !== 200){
                    console.log(request);
                    continue;
                }

                data                    = [...data, request.data];
            }

            setList(data);

        }catch(exception){
            console.log(exception);
            return;
        }
    };
    const setTypeImg                    = () => {
        let images                      = {};
        let r                           = require.context("../assets/img/type", false, /\.(png|jpe?g|svg)$/);
        r.keys().map((item, index)      => { 
            return images[item.replace(/\.\/|\.png/g, "")]  = r(item); 
        });
        setType(images);
    }

    // USEEFFECT===========================================================================================================
    useEffect(() => {
        setTypeImg();
        requestGetPokemon();
    }, []);

    useEffect(() => {
        
        if(up){
            setSelectId(selectId === 1 ? 151 : selectId - 1);            
        }

        if(down){
            setIsTop(selectId - 9);
            setSelectId(selectId === 151 ? 1 : selectId + 1);
        }

    }, [up, down]);

    return (
        <>
            <div className="bg-pokedex-base-green text-pokedex-base-white text-center text-shadow text-4xl">
                POKéMON LIST
            </div>
            <div className="h-[323px] overflow-hidden bg-white text-4xl">
                {list.map((item, key) => {
                    return (
                        <div className={`${(selectId - 9) >= item.id && isTop <= item.id ? "hidden" : "flex"} uppercase h-[35.5px] overflow-hidden leading-[28px] px-4`} key={key}>
                            <div className={`pl-2 pr-1 flex ${selectId === item.id ? "" : "opacity-0"}`}>
                                <img src={arrow} alt={`arrow`} className="m-auto mr-0 mt-2" width={12}/>
                            </div>
                            <div className="w-[65px]">
                                Nº{item.id.toString().padStart(3, "0")}
                            </div>
                            <div className="flex px-5 pb-1">
                                <img src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${item.name}.png`} alt={`img pokemon ${item.name}`} className="mx-auto -mt-1" width={40}/>
                            </div>
                            <div className="w-5/12">
                                {item.name}
                            </div>
                            <div className="pt-1 w-4/12 flex items-center">
                                {item.types.map((itemType, keyType) => { 
                                    return (
                                        <img src={itemType.type.name in type ? type[itemType.type.name] : type["unknown"]} alt={`type`} key={keyType} width={75}/>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}                    
            </div>
            <div className="bg-pokedex-base-green text-pokedex-base-white text-center text-shadow text-4xl">
                PICK
            </div>
        </>
    );
}