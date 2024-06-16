import * as React from "react";
import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./mobile.scss";

function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
            "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(url = window.location.href) {
    let urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
}

export default function Room() {
    const roomID = getUrlParams().get("roomID") || randomID(5);
    const callContainerRef = useRef(null);

    useEffect(() => {
        const requestAudioPermission = async () => {
            try {
                // await navigator.mediaDevices.getUserMedia({ audio: true });
                console.log("Audio permission granted");
                startMeeting(callContainerRef.current);
            } catch (error) {
                console.error("Audio permission denied", error);
            }
        };

        const startMeeting = async (element) => {
            // generate Kit Token
            const appID = 2035834557;
            const serverSecret = "dba9410c8ed11ce85b3eb9cae9d9d640";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                randomID(5),
                randomID(5)
            );

            // Create instance object from Kit Token.
            const zp = ZegoUIKitPrebuilt.create(kitToken);
            // start the call
            zp.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: "Copy link",
                        url:
                            window.location.protocol +
                            "//" +
                            window.location.host +
                            window.location.pathname +
                            "?roomID=" +
                            roomID,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
                },
            });
        };

        requestAudioPermission();
    }, [roomID]);

    return (
        <div
            className="myCallContainer"
            ref={callContainerRef}
            style={{ width: "100vw", height: "100vh" }}
        ></div>
    );
}
