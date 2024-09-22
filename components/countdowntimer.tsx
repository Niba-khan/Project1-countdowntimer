"use client"

import { useState, useRef, useEffect, ChangeEvent} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { time } from "console";

export default function CountDownTimer(){
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timeRef = useRef<NodeJS.Timeout |null>(null);

    const handleSetDuration = (): void => {
      if(typeof duration === "number" && duration >0){
        setTimeLeft(duration);
        setIsActive(false);
        setIsPaused(false);

        if(timeRef.current){
            clearInterval(timeRef.current)
        }
      }
    };

    const handleStart = () => {
        if (timeLeft > 0) {
          setIsActive(true);
          setIsPaused(false);
        }
      };

      const handlePaused = (): void =>{
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timeRef.current){
                clearInterval(timeRef.current)
            }
        }
      };
    

        const handleReset = ():void => {
            setIsActive(false);
            setIsPaused(false);
            setTimeLeft(typeof duration === "number"? duration : 0);
            if(timeRef.current){
                clearInterval(timeRef.current);
          }
      };

      useEffect(()=>{
       if(isActive && !isPaused){
        timeRef.current = setInterval(() => {
          setTimeLeft((prevTime) => {
            if(prevTime <= 1){
                clearInterval(timeRef.current!);
                return 0;
            }
            return prevTime -1;
          });  
        }, 1000);
    }
      return()=>{
     if(timeRef.current){
            clearInterval(timeRef.current)
     }
    };
      }, [isActive, isPaused])

      const formatTime = (time:number): string =>{
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    };

    const handleDurationChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        setDuration(Number(e.target.value || ""));
    };
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-fuchsia-500/20 ">
            <div className="bg-pink-700/40 dark:bg-cyan-300 shadow-lg p-8 w-full max-w-md rounded-full">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">CountDown Timer</h1>
                <div className="flex items-center mb-6">
                  <Input 
                  type="number"
                  id="duration"
                  placeholder="Enter duration in seconds"
                  value={duration}
                  onChange={handleDurationChange}
                className="flex-1 mr-7 rounded-md border-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  />

                  <Button 
                  onClick={handleSetDuration}
                  variant="outline"
                  className="text-gray-800 dark:text-gray-900/40"
                  >
                    Set
                  </Button>
                </div>
                <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                  {formatTime(timeLeft)}
                </div>
                <div className="flex justify-center gap-4">
                  
                <Button 
                  onClick={handleStart}
                  variant="outline"
                  className="text-gray-800 dark:text-gray-900/40"
                  >
                    {isPaused ? "resume": "start"}
                    </Button>
                    <Button 
                  onClick={handlePaused}
                  variant="outline"
                  className="text-gray-800 dark:text-gray-900/40"
                  >
                 Pause
                    </Button>
                    <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="text-gray-800 dark:text-gray-900/40"
                  >
                 Reset
                    </Button>
                </div>
            </div>
        </div>
    )
} 