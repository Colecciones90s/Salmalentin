import { useState, useEffect, useRef } from "react";
import JSConfetti from "js-confetti";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2"; 

function App() {
  const [claveIngresada, setClaveIngresada] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarClave, setMostrarClave] = useState(false);
  const CLAVE_CORRECTA = "salmateto12";

  const jsConfetti = new JSConfetti();
  const [randomValor, setRandomValor] = useState({});
  const [agrandar, setAgrandar] = useState(45);
  const [valueSi, setValueSi] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const [showControls, setShowControls] = useState(false);
  const [musicaIniciada, setMusicaIniciada] = useState(false);

  const musicFiles = [
    { name: "Sólo Importas Tú", file: "song0.webm" },
    { name: "Anhelo", file: "song1.webm" },
    { name: "Colgando en Tus Manos", file: "song2.webm" },
    { name: "Me Muero", file: "song3.webm" },
    { name: "Niña Bonita", file: "song4.webm" },
    { name: "Un montón de estrellas", file: "song5.webm" },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = `/music/${musicFiles[currentSongIndex].file}`;
    if (isPlaying) audio.play();

    audio.onended = () => {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % musicFiles.length);
    };

    return () => {
      audio.pause();
    };
  }, [currentSongIndex, isPlaying]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => console.log("Reproducción automática bloqueada."));
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % musicFiles.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + musicFiles.length) % musicFiles.length);
  };

  const reproducirMusica = () => {
    if (!musicaIniciada) {
      audioRef.current.play();
      setMusicaIniciada(true);
    }
  };

  const randomResponses = [
    { id: 1, description: "Di si por favor", img: "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif" },
    { id: 2, description: "Piénsalo de nuevo.", img: "https://i.pinimg.com/originals/77/6b/21/776b215bed3deeef47fd3aa657685a18.gif" },
    { id: 3, description: "Vamos, atrévete a decir que sí.", img: "https://i.gifer.com/Mpbx.gif" },
    { id: 4, description: "No tengas miedo, será genial.", img: "https://i.pinimg.com/originals/e1/c3/88/e1c388133e0f998e25bb17c837b74a14.gif" },
    { id: 5, description: "Confía en mí, será divertido.", img: "https://media.tenor.com/Bn88VELdNI8AAAAi/peach-goma.gif" },
    { id: 6, description: "No tengas dudas, te hará sonreír.", img: "https://i.pinimg.com/originals/c6/b3/0d/c6b30d1a2dc178aeb92de63295d4ae64.gif" },
    { id: 7, description: "Te prometo que será inolvidable.", img: "https://media.tenor.com/N2oqtqaB_G0AAAAi/peach-goma.gif" },
    { id: 8, description: "No dejes que el miedo te detenga.", img: "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif" },
    { id: 9, description: "Confía en el destino, nos está dando una señal.", img: "https://media.tenor.com/cbEccaK9QxMAAAAi/peach-goma.gif" },
    { id: 10, description: "Confía en mí, será genial.", img: "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif" },
    { id: 11, description: "Confía en mí.", img: "https://i.gifer.com/Z23a.gif" },
    { id: 12, description: "Confía en mí.", img: "https://www.gifcen.com/wp-content/uploads/2021/07/-62.gif" },
    { id: 13, description: "Confía en mí, será genial.", img: "https://i.redd.it/8qts3ul2dcwd1.gif" },
    { id: 14, description: "Confía en mí.", img: "https://i.pinimg.com/originals/f4/70/eb/f470eb7af4598b96a9adccb65d109aed.gif" }
  ];

  const randomResponse = () => {
    let index = Math.floor(Math.random() * randomResponses.length);
    if (agrandar <= 500) setAgrandar(agrandar + 10);
    setRandomValor(randomResponses[index]);
  };

  const verificarClave = () => {
    if (claveIngresada.toLowerCase() === CLAVE_CORRECTA) {
      Swal.fire({
        title: "Oli hermosa 🌻🌻",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      setAutenticado(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Clave incorrecta poto",
        text: "Intenta de nuevo 🍐🍐.",
        confirmButtonColor: "#3085d6",
      });
      setClaveIngresada("");
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      verificarClave();
    }
  };
  
  if (!autenticado) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Ingresa la palabra mágica</h1>
        <div className="relative">
          <input
            type={mostrarClave ? "text" : "password"}
            value={claveIngresada}
            onChange={(e) => setClaveIngresada(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-2 pr-10 rounded text-black"
            placeholder="Clave..."
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setMostrarClave(!mostrarClave)}
          >
            {mostrarClave ? (
              <EyeSlashIcon className="h-6 w-6" />
            ) : (
              <EyeIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        <button
          onClick={verificarClave}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Acceder
        </button>
      </div>
    );
  }

  return (
    <main className="fondo w-screen h-screen bg-no-repeat bg-cover flex items-center justify-center bg-center">
      <div className="fixed bottom-5 right-5">
        {!showControls ? (
          <button
            onClick={() => setShowControls(true)}
            className="w-14 h-14 flex items-center justify-center bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
          >
            <Music size={30} />
          </button>
        ) : (
          <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-4 shadow-lg transition-all">
            <button onClick={prevSong} className="text-white"><SkipBack size={24} /></button>
            <button onClick={togglePlayPause} className="text-white">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={nextSong} className="text-white"><SkipForward size={24} /></button>
            <span className="text-white font-semibold">{musicFiles[currentSongIndex].name}</span>
            <button
              onClick={() => setShowControls(false)}
              className="text-gray-400 hover:text-white transition"
            >
              ✖
            </button>
          </div>
        )}
      </div>

      {!valueSi ? (
        <div className="p-5">
          <h1 className="text-white font-bold text-5xl text-center color_texto">¿Quieres ser mi Salmalentin?</h1>
          <img 
            src={randomValor.img || "https://i.pinimg.com/originals/cd/c1/31/cdc131bd280551132d41924e86973599.gif"} 
            alt="Salmalentin" 
            className="mx-auto" 
            width={400} 
            height={400} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 items-center">
            <button 
              onClick={() => {
                setValueSi(true);
                reproducirMusica();
                jsConfetti.addConfetti({ emojis: ['😍', '🥰', '❤️', '😘','🌻'], emojiSize: 70, confettiNumber: 80 });
              }} 
              className="bg-green-500 text-white font-bold p-2 rounded-md text-xl"
              style={{ height: agrandar }}
            >
              Sí
            </button>
            <button 
              className="bg-red-500 text-white font-bold p-2 rounded-md text-xl"
              onClick={() => {
                randomResponse(); 
                reproducirMusica();
              }}
            >
              {randomValor.description || "No"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-10">
          <h1 className="text-4xl text-white font-bold color_texto">Sabía que dirías que sí 🌻❤️🌻 ¡Vamos por un ñam ñam!</h1>
          <img src="https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif" alt="" className="mx-auto" />
        </div>
      )}
    </main>
  );
}

export default App;
