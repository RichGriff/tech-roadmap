import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cleanDescription } from "@/lib/utils";

interface HeadingProps {
    title: string;
    description: string;
    sponsor?: string | null;
    partner?: string | null;
  }
  
  export const Heading: React.FC<HeadingProps> = ({
    title,
    description,
    sponsor,
    partner
  }) => {
    const initalSponsor = sponsor ? `${sponsor.charAt(0)}${sponsor.split(' ')[1].charAt(0)}` : null
    const initalPartner = partner ? `${partner.charAt(0)}${partner.split(' ')[1].charAt(0)}` : null
    
    return ( 
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
        <div className="flex flex-col items-start justify-start w-full sm:w-2/3">
          <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {cleanDescription(description)}
          </p>
        </div>
        <div className="flex justify-start items-center gap-8">
          {sponsor && (
            <div className="flex justify-start items-center gap-4 sm:px-4">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className='bg-indigo-500 text-white'>{initalSponsor}</AvatarFallback>
              </Avatar>
              <div className="my-4 sm:my-0">
                <p className="text-xs text-muted-foreground">Business Sponsor:</p>
                <p className="text-md font-medium">{sponsor}</p>
              </div>
            </div>
          )}
          {partner && (
            <div className="flex justify-start items-center gap-4 sm:px-4">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className='bg-indigo-500 text-white'>{initalPartner}</AvatarFallback>
              </Avatar>
              <div className="my-4 sm:my-0">
                <p className="text-xs text-muted-foreground">Delivery Partner:</p>
                <p className="text-md font-medium">{partner}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
   