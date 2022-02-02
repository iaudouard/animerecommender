use std::fs;
use std::error::Error;
use serde_json::{Value, Map};
use std::fs::File;
use std::io::Read;
use std::collections::HashMap;
extern crate serde_derive;
extern crate serde;
extern crate serde_json;
use serde::{Serialize, Deserialize};
use std::time::{Duration, Instant};
use std::thread::sleep;


#[derive(Deserialize, Debug)]
struct Titles {
    romaji : Option<String>,
    english: Option<String>,
    native: Option<String>,
    user_prefered: Option<String>,

}
#[derive(Deserialize, Debug)]
struct CoverImage{
    large : Option<String>,
}

#[derive(Deserialize, Debug, Clone)]
struct Anime {
    id : Option<f32>,
    idMal : Option<f32>,
    title: Option<HashMap<String, Option<String>>>,
    description : Option<String>, 
    seasonYear : Option<f32>,
    trailer : Option<HashMap<String, String>>,
    coverImage : Option<HashMap<String, Option<String>>>,
    bannerImage : Option<String>,
    type_ : Option<String>,
    format : Option<String>,
    averageScore : Option<f32>,
    synonyms : Option<Vec<String>>,
    tag_vec : Vec<f32>,
    gen_vec : Vec<f32>,
    simi : f32

}


impl Anime {
    fn add_simi(&mut self, simi_score:f32){
        self.simi = simi_score;
    }
}

// fn get_titles(animes:Value) -> Vec<String> {
//     let mut titles = vec![];

//     for x in animes.keys(){
//         titles.push(x);
//     }

//     return titles

// }

fn search(animes:Value, ask:String)->Value{
    return animes[ask].clone()
}
fn open_Animes() -> serde_json::Result<HashMap<String, Anime>> {

    let filename = "src/anime_db.json";
    match File::open(filename) {
        // The file is open (no error).
        Ok(mut file) => {
            

            // Read all the file content into a variable (ignoring the result of the operation).
            file.read_to_string(&mut content).unwrap();

            // The file is automatically closed when is goes out of scope.
        },
        // Error handling.
        Err(error) => {
            println!("Error opening file {}: {}", filename, error);
        },
    }


    // Parse the string of data into serde_json::Value.
    let mut v: HashMap<String, Anime> = serde_json::from_str(&content)?;

    // Access parts of the data by indexing with square brackets.

    Ok(v)
}

fn dot(v1: Vec<f32>, v2:Vec<f32>) -> f32 {
    let mut prod: f32 = 0.0;
    for x in 0..v1.len(){
        prod += v1[x] * v2[x];
    }

    return prod;

}

fn norme(v1: Vec<f32>) -> f32{
    let mut sum: f32 = 0.0;
    for x in 0..v1.len(){
        sum += v1[x]*v1[x];
    }
    return((sum as f64).sqrt() as f32).into();
}

fn get_degree_of_sim(v1: &Vec<f32>, v2: Vec<f32>) -> f32{

    let dot: f32 = dot(v1.clone(), v2.clone());
    let norm1: f32 = norme(v1.clone());
    let norm2: f32 = norme(v2.clone());

    if norm1*norm2 > 0.0{
        return dot/(norm1*norm2)
    }
    else{
        return 0.0
    };
    
}


fn inter(mut animes:HashMap<String, Anime>, choice:Anime, check:f32)->(Vec<Anime>){

    let choice_anime_vector = choice.tag_vec;
    let choice_anime_vector_gen  = choice.gen_vec;


    let anime_type = choice.format;
    let mut final_recommendations = vec![];

    for (_, x) in animes.iter_mut(){
        let anime_vec = animes[x].tag_vec.clone();
        let anime_gen_vec = animes[x].gen_vec.clone();

        let degree_of_similarity : f32 = get_degree_of_sim(&choice_anime_vector, anime_vec);
        let degree_of_sim_gen : f32 = get_degree_of_sim(&choice_anime_vector_gen, anime_gen_vec);

        if degree_of_similarity >= check {
            let mut tit = x.clone();
            // animes.get_mut(&x as &str)?.add_simi(degree_of_similarity + degree_of_sim_gen);
            println!("{:?}", animes.get_mut(tit.as_str()));
            final_recommendations.push(animes[x].clone());

        };

    };
    return final_recommendations;

}


fn main(){

    let now = Instant::now();
    let mut animes = open_Animes().unwrap();
    println!("{:?}", animes["Cowboy Bebop"]);
    let our_vec = animes["Cowboy Bebop"].tag_vec.clone();
    for x in animes.keys(){
        let vec = animes[x].tag_vec.clone();
        println!("{}",get_degree_of_sim(&our_vec, vec));
    }
    let new_now = Instant::now();
    println!("Opening and reading took : {:?}", new_now.duration_since(now));


}
