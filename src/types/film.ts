export interface Film {
  Film: {
    Title_Original: string;
    Title_English: string;
    Title_Other: string;
    Language_Original: string;
    Language_Subtitles: string;
    Country_of_production: string;
    Date_of_completion: string;
    Runtime: string;
    Number_of_series: string;
    Number_of_episodes: string;
    Titles_and_runtime_of_episodes: string;
    First_Film: string;
    Genre_List: string[];
    Genre_Other: string;
    Keywords: string;
    Target_Group: {
      Rating: string;
      Audience: string;
      Other: string;
    };
  };
  Premiere: Array<{
    Date: string;
    Country: string;
    Name_of_place_of_premiere: string;
  }>;
  Festivals: Array<{
    Date: string;
    Country: string;
    Name_of_Festival: string;
  }>;
  Awards: Array<{
    Date: string;
    Country: string;
    Festival_Section_of_Competition: string;
  }>;
  Logline: string;
  Synopsis: string;
  Directors_Note: string;
  Crew: {
    "Director(s)": string;
    "Screenplay_writer(s)": string;
    "Director(s)_of_Photography": string;
    "Editor(s)": string;
    "Sound_director(s)": string;
    "Art_director(s)": string;
    "Music_composer(s)": string;
    Cast: any[];
  };
  Director_Bio: {
    Date_of_birth: string;
    Bio_Text: string;
  };
  Director_Filmography: any[];
  Technical_Details: any;
  Production_Company: any;
  Producer_Representative: any;
  Contact: any;
  ParsedRanking?: number;
  Ranking?: string;
  Review?: string;
  Festival_Distribution_Only?: string;
  Sales?: string;
  Status?: string;
  Download_poster?: string;
  Download_stills?: string;
  Download_presskit?: string;
  Sharing?: string;
  Trailer_url?: string;
}
