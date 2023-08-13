import express from "express";
import cors from "cors";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    credentials : true,
    origin : "*"
}));

let userProfile = {
    name : "Yuvaraj A",
    bio : "Front End Developer",
    image : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png"
};

let postList = [
    {
        message: "Hello! Good Day Everyone",
        id: 1,
        like: 2,
        comments: ["Thanks", "Good Day!"],
        image: "https://hips.hearstapps.com/hmg-prod/images/hand-holding-a-piece-of-paper-with-good-morning-royalty-free-image-1686234680.jpg"
    },
    {
        message: "Happy Morning People!",
        id: 2,
        like: 4,
        comments: ["Great"],
        image: "https://img.freepik.com/free-vector/positive-lettering-message-concept_23-2148444729.jpg?w=2000"
    }
];

let friendsList = [
    {
        name : "William",
        image : "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
    },
    {
        name : "Tom",
        image : "https://i.imgur.com/JFHjdNr.jpg"
    },
    {
        name : "Anderson",
        image : "https://i.imgur.com/zLCYdR9.jpg"
    },
    {
        name : "Samantha",
        image : "https://pixinvent.com/materialize-material-design-admin-template/laravel/demo-4/images/user/12.jpg"
    },
    {
        name : "Roger",
        image : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    },
    {
        name : "Andrews",
        image : "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
    },
    {
        name : "Jhonson",
        image : "https://i.imgur.com/JFHjdNr.jpg"
    },
    {
        name : "Jibbs",
        image : "https://i.imgur.com/zLCYdR9.jpg"
    },
    {
        name : "Anna",
        image : "https://pixinvent.com/materialize-material-design-admin-template/laravel/demo-4/images/user/12.jpg"
    },
    {
        name : "Richard",
        image : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    }
]

app.get("/api/profile", (request, response) => {
    response.status(200).send(userProfile);
});

app.post("/api/update/profile", (request, response) => {
    const updatedProfile = request.body;
    userProfile = updatedProfile;
    response.status(200).send("Profile has been updated successfully");
});

app.get("/api/list/post", (request, response) => {
    response.status(200).send(postList);
});

app.post("/api/update/post", (request, response) => {
    const updatedPost = request.body;
    postList = updatedPost;
    response.status(200).send("Post has been updated successfully");
});

app.get("/api/list/friends", (request, response) => {
    response.status(200).send(friendsList);
})

app.delete("/api/delete/:id", (request, response) => {
    let id = request.params.id;
    postList.splice(id, 1);
    response.status(200).send("Post has been deleted"); 
})

const port = 4000;
server.listen(port, () => {
    console.log("Node JS server is running");
})