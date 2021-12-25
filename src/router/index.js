import Vue from "vue";
import VueRouter from "vue-router";
import NavigtionBar from "../components/NavigationBar.vue";

/* 首页 */
import Home from "../components/Home/Home.vue";
import CreateAnnouncement from "../components/Home/CreateAnnouncement.vue";
import UpdateAnnouncement from "../components/Home/UpdateAnnouncement.vue";

import Contest from "../components/Contest/Contest.vue";
import Contesthome from "../components/Contest/Contesthome.vue";
import Topic from "../components/Topic/Topic.vue";
import Login from "../components/Login.vue";
import Addproblems from "../components/Topic/Addproblems.vue";
import Submit from "../components/Topic/Submit.vue";

/* 用户页面 */
import User from "../components/User/User.vue";
import PassList from "../components/User/PassList.vue"
import UserFavorite from "../components/User/UserFavorite.vue"
import MyCollection from "../components/User/MyCollection.vue"

import Revise from "../components/Topic/Revise.vue";
import UserSubmit from "../components/UserSubmit/UserSubmit.vue";
import ProblemSubmit from "../components/Topic/ProblemSubmit.vue";
import AddContest from "../components/Contest/AddContest.vue";
import ReviseContest from "../components/Contest/ReviseContest.vue";
import RankList from "../components/Contest/RankList.vue";

import Class from "../components/Class/Class.vue";
import AddClass from "../components/Class/AddClass.vue";
import ClassHome from "../components/Class/ClassHome.vue";
import ReviseClass from "../components/Class/ReviseClass.vue";
import AddHomework from "../components/Class/AddHomework.vue";
import StudentList from "../components/Class/StudentList.vue";
import ReviseHomework from "../components/Class/ReviseHomework.vue";
import StudentHomework from "../components/Class/StudentHomework.vue";
import HomeworkRankList from "../components/Class/HomeworkRankList.vue";

/* 题单 */
import ProblemList from "../components/ProblemList/ProblemList.vue";
import AddProblemsList from "../components/ProblemList/AddProblemsList.vue";
import ProblemListHome from "../components/ProblemList/ProblemListHome.vue";
import ProblemListHomeInfo from "../components/ProblemList/ProblemListHomeInfo.vue";
import ProblemListHomeList from "../components/ProblemList/ProblemListHomeList.vue";
import ReviseProblemList from "../components/ProblemList/ReviseProblemList.vue";

/* 后台 */
import Admin from "../components/Admin/Admin.vue"
import JudgeServer from "../components/Admin/JudgeServer.vue"
import SubmitServer from "../components/Admin/SubmitServer.vue"
Vue.use(VueRouter);

const routes = [
	{ path: "/", redirect: "/home" },
	{ path: "/login", component: Login },
	{ path: "/submit", name: "submit", component: Submit },
	{
		path: "/navigtionbar",
		component: NavigtionBar,
		children: [
			{ path: "/", redirect: "/topic" },
			// 主页
			{ path: "/home", name: "home", component: Home },
			{
				path: "/createannouncement",
				name: "createannouncement",
				component: CreateAnnouncement,
			},
			{
				path: "/updateannouncement",
				name: "updateannouncement",
				component: UpdateAnnouncement,
			},
			// 比赛页面
			{ path: "/contest", name: "contest", component: Contest },
			{
				path: "/contesthome",
				name: "contesthome",
				component: Contesthome,
			},
			{ path: "/addcontest", name: "addcontest", component: AddContest },
			{
				path: "/revisecontest",
				name: "revisecontest",
				component: ReviseContest,
			},
			{ path: "/RankList", name: "RankList", component: RankList },
			// 题库页面
			{ path: "/topic", name: "topic", component: Topic },
			{
				path: "/addproblems",
				name: "addproblems",
				component: Addproblems,
			},
			{ path: "/revise", name: "revise", component: Revise },
			{
				path: "/problemSubmit",
				name: "problemSubmit",
				component: ProblemSubmit,
			},
			// 题单页面
			{
				path: "/problemlist",
				name: "problemlist",
				component: ProblemList,
			},
			{
				path: "/addproblemslist",
				name: "addproblemslist",
				component: AddProblemsList,
			},
			{
				path: "/reviseproblemlist",
				name: "reviseproblemlistt",
				component: ReviseProblemList,
			},
			{
				path: "/problemlisthome",
				name: "problemlisthome",
				component: ProblemListHome,
				children: [
					{ path: "/", redirect: "/problemlisthomeinfo" },
					{
						path: "/problemlisthomeinfo",
						name: "problemlisthomeinfo",
						component: ProblemListHomeInfo,
					},
					{
						path: "/problemlisthomelist",
						name: "problemlisthomelist",
						component: ProblemListHomeList,
					},
				],
			},

			// 提交记录页面
			{ path: "/usersubmit", name: "usersubmit", component: UserSubmit },
			// 用户界面
			{ path: "/user", component: User, children: [
				{ path: "/", redirect: "/passlist" },
				//通过题目页面
				{ path: "/passlist", name: "passlist", component: PassList },
				//收藏题单
				{ path: "/userfavorite", name: "userfavorite", component: UserFavorite },
				//我的题单
				{ path: "/mycollection", name: "mycollection", component: MyCollection },
			] },
			// 班级页面
			{ path: "/class", name: "class", component: Class },
			{ path: "/addclass", name: "addclass", component: AddClass },
			{ path: "/classhome", name: "classhome", component: ClassHome },
			{
				path: "/reviseclass",
				name: "reviseclass",
				component: ReviseClass,
			},
			{
				path: "/addhomework",
				name: "addhomework",
				component: AddHomework,
			},
			{
				path: "/studentlist",
				name: "studentlist",
				component: StudentList,
			},
			{
				path: "/revisehomework",
				name: "revisehomework",
				component: ReviseHomework,
			},
			{
				path: "/studenthomework",
				name: "studenthomework",
				component: StudentHomework,
			},
			{
				path: "/homework_rank_list",
				name: "homeworkranklist",
				component: HomeworkRankList,
			},
			//后台
			{ path: "/admin", name: "admin", component: Admin, children: [
				{ path: "/", redirect: "/judgeserver" },
				//测评服务器
				{ path: "/judgeserver", name: "judgeserver", component: JudgeServer },
				//提交记录
				{ path: "/submitserver", name: "submitserver", component: SubmitServer },
				]
			}
		],
	},
];

const router = new VueRouter({
	routes,
});

export default router;
