import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {

    const [longUrl, setLongUrl] = useState();
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault()
        if (longUrl) navigate(`/auth?createNew=${longUrl}`)
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="my-10 text-3xl font-extrabold text-center text-white sm:my-16 sm:text-6xl lg:text-7xl">
                The only URL Shortner <br /> you&rsquo;ll ever need!
            </h2>
            <form
                onSubmit={handleShorten}
                className="flex flex-col w-full gap-2 sm:h-14 sm:flex-row md:w-2/4">
                <Input
                    type="url"
                    value={longUrl}
                    placeholder="Enter your loooong URL"
                    onChange={(e) => setLongUrl(e.target.value)}
                    className="flex-1 h-full px-4 py-4" />
                <Button className="h-full" type="submit" variant="destructive">Shorten!</Button>
            </form>
            <img src="./banner.jpeg" alt="banner" className="w-full my-11 md:px-11" />

            <Accordion type="multiple" collapsible className="w-full md:px-11">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        How does the Trimrr URL shortener works?
                    </AccordionTrigger>
                    <AccordionContent>
                        When you enter a long URL, our system generates a shorter version of that URL. This shortened URL redirects to the original long URL when accessed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        Do I need an account to use the app?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. Creating an account allows you to manage your URLs, view analytics, and customize your short URLs.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        What analytics are available for my shortened URLs?
                    </AccordionTrigger>
                    <AccordionContent>
                        You can view the number of clicks, geolocation data of the clicks and device types (mobile/desktop) for each of your shortened URLs.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default LandingPage
