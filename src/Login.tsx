import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Login.css';
import GoogleLogo from './Components/images/search.png';
import Loginpic from './Components/images/img9 1.png';
import CryptoJS from 'crypto-js';

interface UserData {
  access_token: string;
}

interface GoogleUserInfo {
  name: string;
  email: string;
  picture: string;
}

interface FetchResponse {
  StudentId: string;
  Overview: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [, setUserName] = useState<string>('');
  const [email, setUserEmail] = useState<string>('');
  const [, setUserPicture] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const secretKey: string = 'gvhbfijsadfkefjnujrbghj';

  const handleCloseAlert = (): void => setShowAlert(false);

  const handleLogin = useGoogleLogin({
    onSuccess: (codeResponse: UserData) => setUser(codeResponse),
    onError: (error: any) => {
      console.error('Login Failed:', error);
      setAlertMessage('Login Failed');
      setShowAlert(true);
    }
  });

  useEffect(() => {
    if (!user) return;

    const fetchUserProfile = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data } = await axios.get<GoogleUserInfo>(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`);
        const { name, email, picture } = data;

        const encryptedName = CryptoJS.AES.encrypt(name, secretKey).toString();
        const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
        const encryptedPicture = CryptoJS.AES.encrypt(picture, secretKey).toString();

        sessionStorage.setItem('Name', encryptedName);
        sessionStorage.setItem('Email', encryptedEmail);
        sessionStorage.setItem('Picture', encryptedPicture);

        setUserName(name);
        setUserEmail(email);
        setUserPicture(picture);


        // const sentData = { Email: email, Name: name };
        // const response = await fetch('https://exskilence-internships-backend.azurewebsites.net//fetch/', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(sentData),
        // });

        // const result: FetchResponse = await response.json();
        // const encryptedStudentId = CryptoJS.AES.encrypt(result.StudentId, secretKey).toString();
        // sessionStorage.setItem('StudentId', encryptedStudentId);

        setLoading(false);
        // navigate(result.Overview ? '/ExskilenceInternshipCard' : '/Dashboard');
        navigate('/Dashboard');
      } catch (error: any) {
        setLoading(false);
        if (error.response?.status === 504) {
          navigate('/Error504');
        } else {
        navigate('/Dashboard');

          setAlertMessage(`User not found with this Email "${email}". Please try again with another email.`);
          setShowAlert(true);
          console.error('Error:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user, navigate]);

  return (
    <div className='login'>
    <div className="container-fluid h-100 d-flex align-items-center justify-content-center">
        <div className="row w-100">
            <div className="col-12 col-md-12 col-lg-7 d-flex align-items-center justify-content-center">
                <div className="p-4 text-center" style={{ borderRadius: '15px', color: '#003e80', backgroundColor: 'transparent' }}>
                    <h2 className="font-weight-bold  mb-4">Welcome to Exskilence Upskilling Program</h2>
                    <p style={{ fontSize: '1.25rem', lineHeight: '1.8', textAlign:'justify' }}>
                        Upskilling refers to the process of acquiring new skills or enhancing existing ones to stay relevant in the ever-evolving job market. As industries rapidly change due to technological advancements and shifting economic landscapes, continuous learning has become essential for career growth and adaptability. By engaging in upskilling, individuals can improve their expertise, increase job opportunities, and remain competitive in their field. For organizations, investing in employee upskilling fosters innovation, boosts productivity, and helps retain top talent, ensuring that the workforce remains agile and future-ready.
                    </p>
                </div>
            </div>
            <div className="col-12 col-md-10 col-lg-4 mt-5 d-flex flex-column justify-content-center align-items-center p-4">
                <div className="loginCard glow card">
                    <div className="loginCardBody card-body d-flex flex-column align-items-center">
                        <h3 className="card-title text-center pb-3 mx-1">Login with your Google account</h3>
                        <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={Loginpic} alt="Login" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="text-center">
                            {loading ? (
                                <div className="d-flex justify-content-center text-center align-items-center">
                                    <Spinner color="#0d6efd" size="sm" className='me-2' /> Signing in...
                                </div>
                            ) : (
                                <button 
                                onClick={() => handleLogin()} 
                                    className="btn d-flex justify-content-center align-items-center" 
                                    style={{ 
                                        color: 'white', 
                                        fontWeight: 'bold', 
                                        borderRadius: '100%', 
                                        cursor: 'pointer', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        padding: '10px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ 
                                            backgroundColor: '#6f42c1', 
                                            color: 'white', 
                                            padding: '20px', 
                                            textAlign: 'center', 
                                            borderRadius: '20px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '250px' 
                                        }}>
                                            <img className='me-3' src={GoogleLogo} alt="Google Logo" height={32} width={32} style={{backgroundColor:'white',borderRadius:'0px',padding:"5px"}} />
                                            Sign in with Google
                                        </span>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Modal show={showAlert} onHide={handleCloseAlert} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton className='bg-primary'>
            <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{alertMessage}</Modal.Body>
        <Modal.Footer>
            <Button variant="outline-primary" onClick={handleCloseAlert}>Okay</Button>
        </Modal.Footer>
    </Modal>
</div>
  );
};

export default Login;
