// IMPORT==================================================================================================================
import { useState, useEffect }                                                  from "react";
import axios                                                                    from "axios";
// ASSETS==================================================================================================================
// COMPONENTS==============================================================================================================
// import { GBA }                                                                  from "../components/Svg";
// import { Pokedex }                                                              from "../components/Pokedex";
import { Card, CardExpand }                                                     from "../components/Card";
// RENDER==================================================================================================================
export default function App() {
    // VARIABLES===========================================================================================================       
    const [list, setList]                   = useState([]);
    const [select, setSelect]               = useState({});
    // USEEFFECT===========================================================================================================
    useEffect(() => {
        
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

        requestGetPokemon();
    }, []);
    // RENDER==============================================================================================================
    return (
        <>            
            <div className="container-fluid flex flex-wrap bg-white">
                <div className="flex flex-wrap justify-center md:w-[60%] pt-20">
                    {list.map((item, key) => {
                        return(<Card item={item} onClick={() => {
                            setSelect(item);
                        }} key={key}></Card>);
                    })}
                </div>
                <div className="md:w-[40%] h-screen sticky top-0 p-10 pt-40">
                    {select.id && <CardExpand item={select}></CardExpand>}                    
                </div>
            </div>
        </>
    );
}