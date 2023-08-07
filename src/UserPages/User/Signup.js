import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";
import loginLogo from '../../paran_logo.png';
import Input from "./input";
import useInput from "./useInput";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function Signup(){
    const [studentNumber, setStudentNumber, resetStudentNumber] = useInput("");
    const [password, setPassword, resetPassword] = useInput("");
    const [name, setName, resetName] = useInput("");

    const college = [
        { value: "미디어랩스대학", label: "미디어랩스대학" },
        { value: "공과대학", label: "공과대학" },
        { value: "글로벌경영대학", label: "글로벌경영대학" },
        { value: "의료과학대학", label: "의료과학대학" },
        { value: "인문사회과학대학", label: "인문사회과학대학" },
        { value: "자연과학대학", label: "자연과학대학" },
        { value: "SW융합대학", label: "SW융합대학" },
        { value: "의과대학", label: "의과대학" },
        { value: "체육대학", label: "체육대학" },
    ];

    const major = {
        미디어랩스대학: [
            { value: 'AI&빅데이터학과', label: 'AI&빅데이터학과' },
            { value: '건축학과', label: '건축학과' },
            { value: '공연영상학과', label: '공연영상학과' },
            { value: '디지털애니메이션학과', label: '디지털애니메이션학과' },
            { value: '미디어커뮤니케이션학과', label: '미디어커뮤니케이션학과' },
            { value: '사물인터넷학과', label: '사물인터넷학과' },
            { value: '스마트자동차학과', label: '스마트자동차학과' },
            { value: '에너지공학과', label: '에너지공학과' },
            { value: '영미학과', label: '영미학과' },
            { value: '중국학과', label: '중국학과' },
            { value: '한국문화콘텐츠학과', label: '한국문화콘텐츠학과' },
        ],
        공과대학: [
            { value: '기계공학과', label: '기계공학과' },
            { value: '에너지환경공학과', label: '에너지환경공학과' },
            { value: '디스플레이신소재공학과', label: '디스플레이신소재공학과' },
            { value: '정보통신공학과', label: '정보통신공학과' },
            { value: '나노화학공학과', label: '나노화학공학과' },
            { value: '전기공학과', label: '전기공학과' },
            { value: '전자정보공학과', label: '전자정보공학과' },
            { value: '컴퓨터공학과', label: '컴퓨터공학과' },
            { value: '전자공학과', label: '전자공학과' },
        ],
        글로벌경영대학: [
            { value: '회계학과', label: '회계학과' },
            { value: '관광경영학과', label: '관광경영학과' },
            { value: '국제통상학과', label: '국제통상학과' },
            { value: '경제금융학과', label: '경제금융학과' },
            { value: '글로벌문화산업학과', label: '글로벌문화산업학과' },
            { value: 'IT금융경영학과', label: 'IT금융경영학과' },
            { value: '경영학과', label: '경영학과' },
        ],
        의료과학대학: [
            { value: '의약공학과', label: '의약공학과' },
            { value: '의료IT공학과', label: '의료IT공학과' },
            { value: '작업치료학과', label: '작업치료학과' },
            { value: '보건행정경영학과', label: '보건행정경영학과' },
            { value: '의료생명공학과', label: '의료생명공학과' },
            { value: '임상병리학과', label: '임상병리학과' },
            { value: '의공학과', label: '의공학과' },
        ],
        인문사회과학대학: [
            { value: '경찰행정학과', label: '경찰행정학과' },
            { value: '특수교육과', label: '특수교육과' },
            { value: '사회복지학과', label: '사회복지학과' },
            { value: '청소년교육상담학과', label: '청소년교육상담학과' },
            { value: '행정학과', label: '행정학과' },
            { value: '유아교육과', label: '유아교육과' },
            { value: '법학과', label: '법학과' },
        ],
        자연과학대학: [
            { value: '생명과학과', label: '생명과학과' },
            { value: '식품영양학과', label: '식품영양학과' },
            { value: '화학과', label: '화학과' },
            { value: '환경보건학과', label: '환경보건학과' },
        ],
        SW융합대학: [
            { value: '컴퓨터소프트웨어공학과', label: '컴퓨터소프트웨어공학과' },
            { value: '메타버스&게임학과', label: '메타버스&게임학과' },
            { value: '정보보호학과', label: '정보보호학과' },
        ],
        의과대학: [
            { value: '간호학과', label: '간호학과' },
            { value: '의예과', label: '의예과' },
            { value: '의학과', label: '의학과' },
        ],
        체육대학: [
            { value: '사회체육학과', label: '사회체육학과' },
            { value: '스포츠과학과', label: '스포츠과학과' },
            { value: '스포츠의학과', label: '스포츠의학과' },
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
          width: '300px',
          height: '50px',
          borderRadius: '50px',
          backgroundColor: '#FFFFFF',
          color: '#1d2532',
          boxSizing: 'border-box',
          fontWeight: 'lighter',
          fontSize: '14px',
          margin: '5px 0 10px 0',
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
            <div className='User-header-container'>
                <div className='circle'/>
            </div>
            <div className='logo-div'>
                <img src={loginLogo} alt="signup-logo" className="signup-logo"/>
            </div>
            <div className='user-component'>
                <form className="signup-form-container" onSubmit={handleSubmit} action="/signup" method="post">
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
                            <button className="upload-button">대의원증 업로드</button>
                            <input type="file" onChange={handleImageChange}/>
                        </div>
                        <button type="submit" className="submit-button">Sign-up</button>
                    </div>                    
                </form>      
            </div>
            <div className='User-footer'>
                <h2 className='likelion'>Desiged by 🦁LIKELION 11th & Paran</h2>
            </div>
        </div>
    )
}

export default Signup;