const User = require('../models/user');
const ChatHistory = require('../models/chat-history');
const Group = require('../models/groups');
const awsService = require('../services/awsservices');
const { Op } = require('sequelize');


exports.saveChatHistory = async (req, res, next) => {
    try{
        const user = req.user;
        const { message , GroupId } = req.body;
        if(GroupId == 0) {
            await user.createChatHistory({
                message,
            })
        }else{
            await user.createChatHistory({
                message,
                GroupId,
            })
        }
        return res.status(200).json({ message: "Message saved to database successfully"});
    }catch(err) {
        return res.status(500).json({message: " Internal server Error!"})
    }
}

exports.getUserChatHistory = async (req , res, next)=>{
    try{
        const user = req.user;
        const ChatHistories = await user.getChatHistories();
        return res.status(200).json({ chat:ChatHistories , message:'user chat History fetched'})
    }catch(err){
        return res.status(500).json({message:"intenral server error!"})
    }
}


exports.getAllChatHistory = async( req, res, next)=>{
    try{
        const lastMessageId = req.query.lastMessageId || 0;
        const ChatHistories = await ChatHistory.findAll({
            include :[
                {
                    model:User,
                    attributes: ['id','name','date_time']
                }
            ] ,
            order: [['date_time','ASC']],
            where:{
                GroupId:null,
                id:{
                    [Op.gt]:lastMessageId
                }
            }
        });
        const chats = ChatHistories.map((ele) => {
            const user = ele.User;
            return {
                messageId : ele.id,
                message: ele.message,
                isImage:ele.isImage,
                name:user.name,
                userId:user.id,
                date_time:ele.date_time
            }
        })
        return res.status(200).json({chats,message:"User chat History fetched"})
    }catch(err) {
        console.error(err);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

exports.getcurrentuser = async (req, res, next) =>{
    
        const user = req.user;
        res.json({userId: user.id,user});
    
}

exports.getAlluser = async (req, res, next)=>{
    try{
        const user = req.user;
        const users = await User.findAll({
            attributes:['id','name','imageUrl'],
            where:{
                id:{
                    [Op.not] :user.id
                }
            }
        })
        return res.status(500).json({users, message:"All user successfully fetchd"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: ' Internal Server Error'})
    }
}

exports.createGroup = async (req, res, next)=>{
    try{
        const user= req.user;
        const { name, membersNo, membersIds} = req.body;
        const group = await user.createGroup({
            name,
            membersNo,
            Admin: user.id,
        })
        membersIds.push(user.id);
        await group.addUsers(membersIds.map((ele)=>{
            return Number(ele)
        }));
        return res.status(200).json({group, message: "Group is successfully created"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'internal server error'})
    }
}

exports.updateGroup = async (req, res, next) =>{
    try{
        const user = req.user;
        const {groupId} = req.query;
        const group = await Group.findOne({ where :{id:Number(groupId)}});
        const { name , membersNo, membersIds} = req.body;
        const updatedGroup = await group.update({
            name,
            membersNo,
            AdminId: user.id,

        })
        membersIds.push(user.id);
        await updatedGroup.setUsers(null);
        await updatedGroup.addUsers(membersIds.map((ele) => {
            return Number(ele);
        }))
        return res.status(200).json({updatedGroup, message: " Group is succesfully updated"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}

exports.getAllgroups = async (req, res, next)=>{
    try{
        const groups = await Group.findAll();
        return res.status(200).json({groups , message:"all grup fetched successfully"})
    }catch(err) {
        console.log(err);
        return req.status(500).json({message:"internal server error"})
    }
}

exports.getGroupChatHistory = async (req , res, next)=>{
    try{
        const {groupId} = req.query;
        const ChatHistories = await ChatHistory.findAll({
            include: [
                {
                    model:User,
                    attributes: ['id','name','date_time']
                }
            ],
            order: [['date_time', 'ASC']],
            where : {
                GroupId: Number(groupId),
            }
        })
        const chats = ChatHistories.map((ele) => {
            const user = ele.User;
            return {
                message: ele.message,
                messageId: ele.id,
                isImage: ele.isImage,
                name: user.name,
                userId: user.id,
                date_time: ele.date_time,
            }
        })
        return res.status(200).json({ chats, message:"User chat history fetched"})
    }catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error"});
    }
}

exports.getGroupById = async (req, res, next)=>{
    try{
        const {groupId} = req.query;
        const group = await Group.findOne({ where : {id: Number(groupId)}})
        res.status(200).json({ group , message: "group details succeefullu fetched"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

exports.getMygroups = async (req, res, next)=>{
    try{
        const user = req.user;
        const groups = await user.getGroups();
        return res.status(200).json({message: 'All groups succesfully fetched'})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server Error'})
    }
}

exports.getGroupMembersbyId = async (req, res, next)=>{
    try{
        const { groupId} = req.query;
        const group = await Group.findOne({where : {id: Number(groupId)}})
        const AllusersData = await group.getUsers();
        const users = AllusersData.map((ele)=> {
            return {
                id:ele.id,
                name: ele.name,
            }
        })
        res.status(200).json({users , message: "Group members name successfully fetched"})
    }catch(err) {
        console.log(err);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

exports.saveChatImages = async(req, res, next) =>{
    try{
        const user = req.user;
        const image = req.filel
        const {GroupId} = req,body;
        const filename = `chat-images/group${GroupId}/user${user.id}/${Date.now()}_${image.originalname}`;
        const imageUrl = await awsService.uploadToS3(image.buffer, filename);
        if(GroupId == 0) {
            await user.createChatHistory({
                message: imageUrl,
                isImage:true,
            })
        }else{
            await user.createChatHistory({
                message: imageUrl,
                GroupId,
                isImage: true,
            })
        }
        return res.status(200).json({ message: "image saved to database successfully"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error"})
    }
}