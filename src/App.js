import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoBatteryFull, IoCellular } from "react-icons/io5";
import { IoIosWifi } from "react-icons/io";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import audioMusic from "./assets/palagi.mp3"
gsap.registerPlugin(ScrollTrigger);

function App() {


    const words = `Hello Irish, hahahaha! Wala nanaman akong ginagawa kaya eto ang nagawa ko ngayong araw. Actually, matagal na itong template na ito, di ko lang nagagawa kasi sobrang busy ko this past week. Ngayon, since hindi na ako busy, naisip ko na gawin HAHAHAHA.`;
    const words2 = `Wala, I just wanna say thank you kasi until now, nakakausap pa rin kita. Kahit minsan, bwisit ako sa buhay mo, kinakausap moko hahahahaha.`;
    const words3 = `Wala itong halong ano ha, baka mamaya yun nanaman dating sayo. Etong paraan na ito, ipinapakita ko lang kung gaano ko na-appreciate kung anong ganap sa pagiging magkaibigan natin hahaha.`;
    const words4 = "Pero kung ibang kaibigan, di ko gagawan ng ganito, wala naman akong pakealam sa kanila e HAHAHAHAHAHA. Sobrang appreciated lahat basta sayo.";
    const words5 = `Be safe always, gangster. Bawas-bawasan mo na ang kakainom, wala ka namang mapapala doon. Gayahin moko, mabait lang sa gilid hahahaha!`;
    const words6 = `Libre mo nga ako pag nabasa mo ito! Haha, joke lang. Gusto ko lang din mag-sorry sa mga kalokohang nagagawa ko haha. Yun kasi nakagawian kong gawin.`;
    const words7 = `Wag na wag sana mauubos ang pasensya mo kapag kumukulit ako ng sobra, pagdating sayo. Di lang talaga ako sanay na may nagagalit sa akin. Inaamin ko naman lagi na kamalian ko.`;
    const words8 = `Nakakawindang lang pag hindi moko nire-reply-an hahahah. Basta, super appreciated lahat!! Thank you!!!!!!!`;
    const allWords = words + " " + words2 + " " + words3 + " " + words4 + " " + words5 + " " + words6 + " " + words7 + " " + words8;
    const extraWords = `Wag kana masungit pag tintanong ka. ganon talaga ko mag tanong e haha`;
    const irish = `Lagi kang mag iingat!`;



    const [currentTime, setCurrentTime] = useState("");
    const [isLocked, setIsLocked] = useState(true);
    const [passwordInput, setPasswordInput] = useState(""); // Track password input
    const password = "356472"; // Correct password
    const audioRef = useRef(null);
    const time = "TM " + currentTime;
    const [showTextEffect, setShowTextEffect] = useState(false);


   // volume state
    const [volume, setVolume] = useState(1);
    const [previousVolume, setPreviousVolume] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowTextEffect(true);
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
      }, []);
    const toggleMute = () => {
        const newVolume = volume > 0 ? 0 : previousVolume;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const adjustVolume = (amount) => {
        const newVolume = Math.max(0, Math.min(1, volume + amount));
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleLock = () => {
        setIsLocked(true);
        setPasswordInput("");
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    // Handle unlocking the screen
    const handleUnlock = (input) => {
        if (input === password) {
            setIsLocked(false);
        } else {
            alert("Incorrect password. Try again.");
            setPasswordInput(""); // Clear input on incorrect attempt
        }
    };

    // Handle adding a digit to the password input
    const handleKeyPress = (digit) => {
        if (passwordInput.length < 6) {
            const newInput = passwordInput + digit;
            setPasswordInput(newInput);

            if (newInput.length === 6) {
                handleUnlock(newInput); // Check the passcode immediately
            }
        }
    };

    // Handle clearing the password input
    const handleClear = () => {
        setPasswordInput("");
    };

    useEffect(() => {
        // Play audio when unlocked
        if (!isLocked && audioRef.current) {
            audioRef.current.currentTime = 96;
            audioRef.current.play();

        }
    }, [isLocked]);

    useEffect(() => {
        // ScrollTrigger animation
        gsap.from("#animated-section", {
            scrollTrigger: {
                trigger: "#animated-section",
                start: "top center",
                end: "bottom center",
                scrub: true,
            },
            x: -200,
            opacity: 0,
            duration: 1,
        });
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            const time = new Date();
            let hours = time.getHours();
            const minutes = time.getMinutes();
            const isAM = hours < 12; // Check if it's AM or PM

            // Convert to 12-hour format
            if (hours > 12) {
                hours = hours - 12; // Convert to 12-hour format
            } else if (hours === 0) {
                hours = 12; // Convert 0 hour (midnight) to 12
            }

            const formattedTime = `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes
                } ${isAM ? "AM" : "PM"}`; // Add AM or PM based on time

            setCurrentTime(formattedTime);
        }, 60000); // Update every minute

        // Initial call to set time immediately
        const initialTime = new Date();
        let hours = initialTime.getHours();
        const minutes = initialTime.getMinutes();
        const isAM = hours < 12; // Check if it's AM or PM

        // Convert to 12-hour format
        if (hours > 12) {
            hours = hours - 12; // Convert to 12-hour format
        } else if (hours === 0) {
            hours = 12; // Convert 0 hour (midnight) to 12
        }

        const formattedTime = `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes
            } ${isAM ? "AM" : "PM"}`;

        setCurrentTime(formattedTime);

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    return (
        <div className="h-screen w-full bg-black bg-grid-gray-700 relative flex items-center justify-center">
            {/* iPhone Pro Max Design */}
            <div className="relative w-[440px] h-[844px] bg-gray-300 rounded-[60px] shadow-2xl z-50">
                {/* Outer Frame */}
                <div className="absolute inset-0 bg-gray-700 rounded-[60px]"></div>

                {/* Bezel */}
                <div className="absolute inset-[15px] bg-black rounded-[50px] overflow-hidden z-50">
                    <div className="absolute top-0 left-0 w-full h-[50px] z-10 flex items-center justify-between px-4 backdrop-blur-[2px]">
                        <div className="text-black font-bold text-md mt-3 ml-3 cursor-default">{time}</div>
                        <div className="flex space-x-1.5 mr-3 mt-0">
                            <IoCellular className="text-xl mt-3" />

                            {/* Cellular Signal Icon */}

                            <IoIosWifi className="text-xl mt-3" />

                            {/* Battery Icon */}
                            <IoBatteryFull className="text-xl mt-3" />
                        </div>
                    </div>
                    {/* Dynamic Island */}
                    <div className="absolute top-[15px] left-1/2 transform -translate-x-1/2 w-[100px] h-[26px] bg-black rounded-[15px] flex justify-between items-center px-3 py-1 z-20">
                        <div className="w-[16px] h-[16px] bg-gray-700 rounded-full">
                            <div className="w-[8px] h-[8px] bg-sky-950 mx-auto mt-1 rounded-full"></div>
                        </div>
                        <div className="w-[7px] h-[7px] bg-red-300 rounded-full animate-pulse z-10"></div>
                        <div className="w-[9px] h-[9px] bg-gray-600 rounded-full"></div>
                        <div className="w-[12px] h-[12px] bg-gray-700 rounded-full"></div>
                    </div>

                    {/* Screen */}
                    <div className="absolute inset-[8px] bg-white rounded-[40px] overflow-hidden shadow-inner">
                        <div
                            className="scrollable-content h-full overflow-y-scroll"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            <style>
                                {`.scrollable-content::-webkit-scrollbar {
                                    display: none;
                                }`}
                            </style>

                            {isLocked ? (
                                // Lock Screen
                                <div className="h-[80vh] pt-4 flex flex-col items-center justify-center space-t-10">
                                    {/* Your lock screen content */}
                                    <h1 className="text-xl font-medium mt-10 mb-3">Enter Passcode</h1>
                                    <div className="flex space-x-1">

                                        {/* Render dots for password input */}
                                        {passwordInput.split("").map((_, index) => (
                                            <div
                                                key={index}
                                                className="w-9 h-9 bg-transparent rounded-full flex items-center justify-center text-[47px] text-black font-medium mb-3"
                                            >
                                                &#9679;
                                            </div>
                                        ))}
                                        {/* Render empty circles for remaining digits */}
                                        {[...Array(6 - passwordInput.length)].map((_, index) => (
                                            <div
                                                key={index}
                                                className="w-9 h-9 bg-transparent rounded-full flex items-center justify-center text-lg text-black mb-3"
                                            >
                                                &#9711;
                                            </div>
                                        ))}
                                    </div>

                                    {/* Numeric Keypad */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                                            <button
                                                key={digit}
                                                onClick={() => handleKeyPress(digit)}
                                                className="py-6 px-8 bg-gray-200 rounded-full text-xl font-semibold mb-3"
                                            >
                                                {digit}
                                            </button>
                                        ))}


                                    </div>
                                    <button
                                        onClick={() => handleKeyPress(0)}
                                        className="py-6 px-8 bg-gray-200 rounded-full text-xl font-semibold mb-3"
                                    >
                                        0
                                    </button>
                                    <div className="justify-between items-center space-x-52 pt-24 font-semibold">
                                        <button onClick={handleClear}>Emergency</button>
                                        <button onClick={handleClear}>Cancel</button>
                                    </div>
                                </div>

                            ) : (
                                // Home Screen (Unlocked)
                                <div className="h-[115vh] p-2 mt-2 ">
                                    <div className="mt-8 text-left bg-gray-300 rounded-3xl space-y-2 bg-transparent">
                                        <audio ref={audioRef} src={audioMusic} />
                                        <TextGenerateEffect words={allWords} className="p-2 cursor-default"/>
                                        <TextGenerateEffect words={extraWords} className="p-2 cursor-default" />
                                        <TextGenerateEffect words={irish} className="p-2 cursor-default" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Mute volume up button */}
               <button onClick={toggleMute}><div className="absolute top-[90px] left-[-2px] w-[6px] h-[30px] bg-red-400 rounded-full"></div></button>
                {/* Side volume up button */}
                <button onClick={() => adjustVolume(0.1)}><div className="absolute top-[200px] left-[-4px] w-[6px] h-[50px] bg-slate-400 rounded-full"></div></button>
                {/* Side volume down button */}
               <button onClick={() => adjustVolume(-0.1)}><div className="absolute top-[270px] left-[-4px] w-[6px] h-[50px] bg-slate-400 rounded-full"></div></button>
                {/* Side Lock Buttons */}
                <button onClick={handleLock}><div className="absolute top-[200px] right-[-4px] w-[6px] h-[70px] bg-slate-400 rounded-full"></div></button>

                {/* Bottom Home Bar */}
                <div className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 w-[130px] h-[6px] bg-gray-700 rounded-full shadow-lg mb-1 z-20 border border-red-500"></div>
                {/* Screen Reflection */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-white opacity-10 rounded-[60px] pointer-events-none"></div>
            </div>
        </div>
    );
}

export default App;
