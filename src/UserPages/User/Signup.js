import React, { useState } from 'react';
import axios from 'axios';
import "./User.css";
import loginLogo from '../paran_logo.png';
import Input from "./input";
import useInput from "./useInput";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function Signup(){
    const [studentNumber, setStudentNumber, resetStudentNumber] = useInput("");
    const [password, setPassword, resetPassword] = useInput("");
    const [name, setName, resetName] = useInput("");

    const college = [
        { value: "MLCollege", label: "미디어랩스대학" },
        { value: "EngieeringCollege", label: "공과대학" },
        { value: "GMCollege", label: "글로벌경영대학" },
        { value: "MSCollege", label: "의료과학대학" },
        { value: "HSSCollege", label: "인문사회과학대학" },
        { value: "NSCollege", label: "자연과학대학" },
        { value: "SWCollege", label: "SW융합대학" },
        { value: "MedicalCollege", label: "의과대학" },
        { value: "PhysicalCollege", label: "체육대학" },
    ];

    const major = {
        MLCollege: [
            { value: 'AI and Big Data', label: 'AI&빅데이터학과' },
            { value: 'Architecture', label: '건축학과' },
            { value: 'Performing Arts and Film', label: '공연영상학과' },
            { value: 'Digital Animation', label: '디지털애니메이션학과' },
            { value: 'Media and Communication', label: '미디어커뮤니케이션학과' },
            { value: 'Internet of Things (IoT) Engineering', label: '사물인터넷학과' },
            { value: 'Smart Car Engineering', label: '스마트자동차학과' },
            { value: 'Energy Engineering', label: '에너지공학과' },
            { value: 'English Language and Literature', label: '영미학과' },
            { value: 'Chinese Language and Literature', label: '중국학과' },
            { value: 'Korean Culture and Content', label: '한국문화콘텐츠학과' },
        ],
        EngieeringCollege: [
            { value: 'Mechanical Engineering', label: '기계공학과' },
            { value: 'Energy and Environmental Engineering', label: '에너지환경공학과' },
            { value: 'Display and Materials Engineering', label: '디스플레이신소재공학과' },
            { value: 'Information and Communication Engineering', label: '정보통신공학과' },
            { value: 'Nanochemistry and Chemical Engineering', label: '나노화학공학과' },
            { value: 'Electrical Engineering', label: '전기공학과' },
            { value: 'Electronic Information Engineering', label: '전자정보공학과' },
            { value: 'Computer Engineering', label: '컴퓨터공학과' },
            { value: 'Electronic Engineering', label: '전자공학과' },
        ],
        GMCollege: [
            { value: 'Accounting', label: '회계학과' },
            { value: 'Tourism Management', label: '관광경영학과' },
            { value: 'International Trade', label: '국제통상학과' },
            { value: 'Economics and Finance', label: '경제금융학과' },
            { value: 'Global Culture and Industry', label: '글로벌문화산업학과' },
            { value: 'IT Finance Management', label: 'IT금융경영학과' },
            { value: 'Business Administration', label: '경영학과' },
        ],
        MSCollege: [
            { value: 'Pharmaceutical Engineering', label: '의약공학과' },
            { value: 'Medical IT Engineering', label: '의료IT공학과' },
            { value: 'Occupational Therapy', label: '작업치료학과' },
            { value: 'Health Administration and Management', label: '보건행정경영학과' },
            { value: 'Medical Biotechnology', label: '의료생명공학과' },
            { value: 'Clinical Pathology', label: '임상병리학과' },
            { value: 'Medical Engineering', label: '의공학과' },
        ],
        HSSCollege: [
            { value: 'Police Administration', label: '경찰행정학과' },
            { value: 'Special Education', label: '특수교육과' },
            { value: 'Social Work', label: '사회복지학과' },
            { value: 'Youth Education and Counseling', label: '청소년교육상담학과' },
            { value: 'Public Administration', label: '행정학과' },
            { value: 'Early Childhood Education', label: '유아교육과' },
            { value: 'Law', label: '법학과' },
        ],
        NSCollege: [
            { value: 'Life Science', label: '생명과학과' },
            { value: 'Food and Nutrition', label: '식품영양학과' },
            { value: 'Chemistry', label: '화학과' },
            { value: 'Environmental Health', label: '환경보건학과' },
        ],
        SWCollege: [
            { value: 'Computer Software Engineering', label: '컴퓨터소프트웨어공학과' },
            { value: 'Metaverse and Game', label: '메타버스&게임학과' },
            { value: 'Information Security', label: '정보보호학과' },
        ],
        MedicalCollege: [
            { value: 'Nursing', label: '간호학과' },
            { value: 'Pre-Medicine', label: '의예과' },
            { value: 'Medicine', label: '의학과' },
        ],
        PhysicalCollege: [
            { value: 'Sport and Social Science', label: '사회체육학과' },
            { value: 'Sports Science', label: '스포츠과학과' },
            { value: 'Sports Medicine', label: '스포츠의학과' },
        ],
    };

    const grade = [
        { value: '1', label: '1학년' },
        { value: '2', label: '2학년' },
        { value: '3', label: '3학년' },
        { value: '4', label: '4학년' },
        { value: '5', label: '5학년' }, // 건축학과
    ];

    const [ selectedCollege, setSelectedCollege ] = useState(null);
    const [ selectedMajor, setSelectedMajor ] = useState(null);
    const [ selectedGrade, setSelectedGrade ] = useState(null);

    const handleCollegeChange = (selectedOption) => {
        setSelectedCollege(selectedOption);
        setSelectedMajor(null);   // 단과대가 변경될 때 전공 초기화
    }
    
    const handleMajorChange = (selectedOption) => {
        setSelectedMajor(selectedOption);
    }
    
    const handleGradeChange = (selectedOption) => {
        setSelectedGrade(selectedOption);
    }

    // 선택된 단과대에 따라 해당 단과대에 소속된 전공 옵션을 가져오는 함수
    const getMajor = () => {
        if (selectedCollege && major[selectedCollege.value]) {
            return major[selectedCollege.value];
        } else {
            return [];
        }
    };

    // select-box css
    const customStyles = {
        control: (provided) => ({
          ...provided,
          width: '100%',
          height: '50px',
          borderRadius: '50px',
          backgroundColor: '#FFFFFF',
          color: '#1d2532',
          boxSizing: 'border-box',
          fontWeight: 'lighter',
          fontSize: '14px',
          margin: '0 0 10px 0',
          border: 'solid 1px #1d2532',
          padding: '0 0 0 5px',
        }),
      };
    
    // 사진 첨부
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
    };

    // 가입 버튼 클릭 시 이벤트
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('API_ENDPOINT_URL/signup', {
            studentNumber, password, name, major, college, grade,
          });
    
          // 요청이 성공적으로 완료되었을 때의 처리
          console.log(response.data); // 백엔드에서 보내준 응답 데이터
    
          // 입력 데이터 초기화
          resetStudentNumber();
          resetPassword();
          resetName();
          setSelectedCollege(null);
          setSelectedMajor(null);
          setSelectedGrade(null);
          
    
          // 가입 성공 후 처리
        } catch (error) {
          // 요청이 실패했을 때의 처리
          console.error('가입 실패:', error);
        }
      };

    const navigate = useNavigate();

    return(
        <div className="User-container">
            <div className='header-container'>
                <div className='circle'/>
            </div>
            <img src={loginLogo} alt="signup-logo" className="signup-logo"/>
            <div className='user-component'>
                <form className="form-container" onSubmit={handleSubmit} action="/signup" method="post">
                    <div className="form-div">
                        <div className="div-inputbox">
                            <Input type="text" value={studentNumber} onChange={setStudentNumber} placeholder="학번"/>
                        </div>
                        <div className="div-inputbox">
                            <Input type="password" value={password} onChange={setPassword} placeholder="비밀번호"/>
                        </div>
                        <div className="div-inputbox">
                            <Input type="text" value={name} onChange={setName} placeholder="이름"/>
                        </div>
                        <div className="div-inputbox">
                            <Select options={college} value={selectedCollege} onChange={handleCollegeChange} styles={customStyles} placeholder="단과대학"/>
                        </div>
                        <div className="div-inputbox">
                            <Select options={getMajor()} value={selectedMajor} onChange={handleMajorChange} styles={customStyles} placeholder="학과"/>
                        </div>
                        <div className="div-inputbox">
                            <Select options={grade} value={selectedGrade} onChange={handleGradeChange} styles={customStyles} placeholder="학년"/>
                        </div>
                        <div className="div-inputbox">
                            <input type="file" onChange={handleImageChange} />
                        </div>
                        <button type="submit" className="submit-button">Sign-up</button>
                    </div>                    
                </form>      
            </div>
            <h2 className='likelion'>Desiged by 🦁LIKELION 11th & Paran</h2>
        </div>
    )
}

export default Signup;