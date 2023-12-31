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
    const [listAll, setListAll]                 = useState([]);
    const [list, setList]                       = useState([]);
    const [listElementAll, setListElementAll]   = useState([]);
    const [select, setSelect]                   = useState({});    
    const [loading, setLoading]                 = useState(false);
    const requestGetPokemon                     = async () => {
        try{
            let data                        = [];
            let element                     = [];

            setLoading(true);

            for(let i = 1; i < 152; i++){
                let request                 = await axios({
                    method                  : "get",
                    url                     : `https://pokeapi.co/api/v2/pokemon/${i}`
                });

                if(request.status !== 200){
                    console.log(request);
                    continue;
                }

                data                        = [...data, request.data];
                element                     = [...element, 
                    <Card 
                        item                = {request.data} 
                        onClick             = {() => {setSelect(request.data)}} 
                        key                 = {i} 
                    ></Card>
                ];
            }

            setList(element);
            setListAll(data);
            setListElementAll(element);
            setLoading(false);

        }catch(exception){
            console.log(exception);
            return;
        }
    };
    // USEEFFECT===========================================================================================================
    useEffect(() => {
        requestGetPokemon();
    }, []);
    // RENDER==============================================================================================================
    return (
        <>  
            {loading && 
                <div className="flex justify-center items-center h-screen animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" className="animate-spin" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c4.08 0 7.45 3.05 7.94 7h-4.06c-.45-1.73-2.02-3-3.88-3s-3.43 1.27-3.87 3H4.06C4.55 7.05 7.92 4 12 4" opacity=".3"/><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 2c4.08 0 7.45 3.05 7.94 7h-4.06c-.45-1.73-2.02-3-3.88-3s-3.43 1.27-3.87 3H4.06C4.55 7.05 7.92 4 12 4m2 8c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m-2 8c-4.08 0-7.45-3.05-7.94-7h4.06c.44 1.73 2.01 3 3.87 3s3.43-1.27 3.87-3h4.06c-.47 3.95-3.84 7-7.92 7"/></svg>
                </div>
            }
            <div className={loading ? "hidden": "container-fluid flex flex-wrap bg-white font-gameboy"}>
                <div className="flex flex-wrap justify-center md:w-[60%] pt-20 md:px-[10.6rem] w-full px-[3.2rem]">                    
                    <input 
                        type="text" 
                        className="border w-full p-2 px-4 rounded-md shadow-md outline-0 focus:scale-105 transition duration-300 text-2xl"
                        placeholder="serach by name (bulbasaur) or number (#001)"
                        onInput={(event) => {
                            if(event.target.value.trim() !== ""){
                                setList(listAll.map((item) => {
                                    if(item.name.includes(event.target.value.trim().toLowerCase())){
                                        return(
                                            <Card 
                                                item        = {item} 
                                                onClick     = {() => {setSelect(item)}} 
                                            ></Card>
                                        );
                                    }
                                }));
                            }else{
                                setList(listElementAll);
                            }
                        }}
                    />
                </div>
                <div className="md:w-[40%] flex flex-wrap justify-center items-center pt-14 text-7xl">
                    POKEAPI
                </div>
                <div className="flex flex-wrap justify-center md:w-[60%] pt-20">
                    {list}
                </div>
                <div className="md:w-[40%] h-screen sticky top-0 p-10 pt-40">
                    {select.id ? 
                        <CardExpand item={select}></CardExpand>
                        :
                        <div className="flex justify-center items-center h-[70vh]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c4.08 0 7.45 3.05 7.94 7h-4.06c-.45-1.73-2.02-3-3.88-3s-3.43 1.27-3.87 3H4.06C4.55 7.05 7.92 4 12 4" opacity=".3"/><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 2c4.08 0 7.45 3.05 7.94 7h-4.06c-.45-1.73-2.02-3-3.88-3s-3.43 1.27-3.87 3H4.06C4.55 7.05 7.92 4 12 4m2 8c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m-2 8c-4.08 0-7.45-3.05-7.94-7h4.06c.44 1.73 2.01 3 3.87 3s3.43-1.27 3.87-3h4.06c-.47 3.95-3.84 7-7.92 7"/></svg>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}