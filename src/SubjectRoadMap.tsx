import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from './Components/icons/Back Arrow.png';
import expandhideIcon from './Components/icons/expandhide.png';
import lessonIcon from './Components/icons/lesson.png';
import mcqIcon from './Components/icons/mcq.png';
import codingIcon from './Components/icons/coding.png';
import pyqIcon from './Components/icons/pyq.png';
import notesIcon from './Components/icons/Notes.png'; 
import Sidebar from './Components/Sidebar'; 
import Notification from "./Components/images/Notification.png";
import User from "./Components/images/User.png";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import './SubjectRoadMap.css';

interface NoteSection {
    heading: string;
    content: string;
}

interface Notes {
    title: string;
    sections: NoteSection[];
}

interface MCQOption {
    id: string;
    text: string;
}

interface MCQQuestion {
    id: number;
    question: string;
    options: MCQOption[];
    score: string;
    correctAnswer: string;
    explanation?: string;
}

interface CodingQuestion {
    id: number;
    question: string;
    score: string;
    isSolved: boolean;
}

interface PreviousInterviewQuestion {
    id: number;
    question: string;
    answer: string;
}

interface Lesson {
    video?: string;
    pdf?: string;
    ppt?: string;
    notes?: Notes;
}

interface Chapter {
    Day: number;
    title: string;
    duration: string;
    lesson?: Lesson;
    notes?: {
        pdf?: string;
        ppt?: string;
        notes?: Notes;
    };
    mcqQuestions?: MCQQuestion[];
    codingQuestions?: CodingQuestion[];
    previousInterviewQuestions?: PreviousInterviewQuestion[];
}

interface RoadmapData {
    chapters: Chapter[];
}

const roadmapData: RoadmapData = {
    chapters: [
        {
            Day: 1,
            title: "Data Types",
            duration: "2hrs",
            lesson: {
                video: "https://www.youtube.com/embed/XKHEtdqhLK8?si=jw5iIILmDNTr82LI",
            },
            notes: {
                // pdf: "https://storeholder.blob.core.windows.net/tpdata/media/py250101152601.pdf",
                // ppt: "https://storeholder.blob.core.windows.net/tpdata/media/intro22.ppt",
                notes: {
                    title: "Python Introduction",
                    sections: [
                        {
                            heading: "What is Python?",
                            content: "Python is a high-level, interpreted programming language known for its simplicity and readability."
                        },
                        {
                            heading: "Key Features",
                            content: "- Easy to learn\n- Readable syntax\n- Large standard library\n- Cross-platform compatibility"
                        },
                        {
                            heading: "Applications",
                            content: "- Web Development\n- Data Science\n- AI and Machine Learning\n- Automation and Scripting"
                        }
                    ]
                }
            },
            "mcqQuestions": [
                {
                    "id": 1,
                    "question": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    "options": [
                        { "id": 'A', "text": 'Apple' },
                        { "id": 'B', "text": 'Bottle' },
                        { "id": 'C', "text": 'XYZ' },
                        { "id": 'D', "text": 'ABC' }
                    ],
                    "score": "1/2",
                    "correctAnswer": 'C',
                    "explanation": "Lorem Ipsum is a placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
                },
                {
                    "id": 2,
                    "question": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    "options": [
                        { "id": 'A', "text": 'Apple' },
                        { "id": 'B', "text": 'Bottle' },
                        { "id": 'C', "text": 'XYZ' },
                        { "id": 'D', "text": 'ABC' }
                    ],
                    "score": "1/2",
                    "correctAnswer": 'C',
                    "explanation": "Lorem Ipsum is a placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
                }
            ],
            codingQuestions: [
                {
                    id: 1,
                    question: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    score: "10/30",
                    isSolved: true
                },
                {
                    id: 2,
                    question: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    score: "0/30",
                    isSolved: false
                },
                {
                    id: 3,
                    question: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    score: "0/30",
                    isSolved: true
                }
            ],
            previousInterviewQuestions: [
                {
                    id: 1,
                    question: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    answer: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                },
                {
                    id: 2,
                    question: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    answer: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                },
                {
                    id: 3,
                    question: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    answer: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                }
            ]
        }
    ]
};

const SubjectRoadMap: React.FC = () => {
    const sub=sessionStorage.getItem("subject")||"";
    const url = (subject:string ):string =>{
        if (subject.toLocaleLowerCase().includes("python")){
            return "/py-editor"
        }
        else if (subject.toLocaleLowerCase().includes("sql")){
            return "/sql-editor"
        }
        else if (subject.toLocaleLowerCase().includes("html") || subject.toLocaleLowerCase().includes("css")){return "/html-css-editor"}
        else if (subject.toLocaleLowerCase().includes("js") || subject.toLocaleLowerCase().includes("javascript")){return "/js-editor"}
        return "/html-css-editor"
    }
    const navigateTo= url(sub)
    console.log('navvv',navigateTo)
    const [currentView, setCurrentView] = useState<'lesson' | 'mcq' | 'coding' | 'pyiq' | 'notes'>('lesson');
    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [selectedContent, setSelectedContent] = useState<string>('');
    const [contentType, setContentType] = useState<'notes' | 'pdf' | 'ppt'>('notes');
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
    const [codingQuestionsState, setCodingQuestionsState] = useState<CodingQuestion[]>(roadmapData.chapters[0].codingQuestions || []);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
    const [currentCodingIndex, setCurrentCodingIndex] = useState(0);
    const [currentPYQIndex, setCurrentPYQIndex] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        const availableContentTypes = {
            notes: roadmapData.chapters[0].notes?.notes !== undefined,
            pdf: roadmapData.chapters[0].notes?.pdf !== undefined,
            ppt: roadmapData.chapters[0].notes?.ppt !== undefined
        };

        if (availableContentTypes.notes) {
            setContentType('notes');
        } else if (availableContentTypes.pdf) {
            setContentType('pdf');
            setSelectedContent(roadmapData.chapters[0].notes?.pdf || '');
        } else if (availableContentTypes.ppt) {
            setContentType('ppt');
            setSelectedContent(roadmapData.chapters[0].notes?.ppt || '');
        }
    }, [roadmapData]);

    const toggleSection = useCallback((index: number) => {
        setExpandedSections((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    }, []);

    // const getIconDetails = useCallback((label: string) => {
    //     switch (label) {
    //         case "Lesson":
    //             return { src: lessonIcon, width: "20px", height: "28px" };
    //         case "Practice MCQs":
    //             return { src: mcqIcon, width: "20px", height: "17px" };
    //         case "Practice Codings":
    //             return { src: codingIcon, width: "16px", height: "29px" };
    //         case "Previous Interview Questions":
    //             return { src: pyqIcon, width: "18px", height: "22px" };
    //         case "Notes":
    //             return { src: notesIcon, width: "20px", height: "20px" };
    //         default:
    //             return { src: '', width: "20px", height: "20px" };
    //     }
    // }, []);

    const getViewTypeFromLabel = (label: string): 'lesson' | 'mcq' | 'coding' | 'pyiq' | 'notes' => {
        switch (label) {
            case "Lesson":
                return 'lesson';
            case "Practice MCQs":
                return 'mcq';
            case "Practice Codings":
                return 'coding';
            case "Previous Interview Questions":
                return 'pyiq';
            case "Notes":
                return 'notes';
            default:
                return 'lesson';
        }
    };

    const isActiveSection = (itemLabel: string): boolean => {
        const currentLabel = getViewTypeFromLabel(currentView);
        return itemLabel === currentLabel;
    };

    const handleContentChange = useCallback((type: 'notes' | 'pdf' | 'ppt') => {
        setContentType(type);
        switch (type) {
            case 'notes':
                setSelectedContent('notes');
                break;
            case 'pdf':
                setSelectedContent(roadmapData.chapters[0].notes?.pdf || '');
                break;
            case 'ppt':
                setSelectedContent(roadmapData.chapters[0].notes?.ppt || '');
                break;
            default:
                setSelectedContent('');
        }
    }, [roadmapData]);

    
    const allQuestionsAnswered = roadmapData.chapters[0].mcqQuestions?.every((question) =>
        answeredQuestions.has(question.id)
    ) || false;

    const handleSolve = useCallback((questionId: number) => {
        setCodingQuestionsState((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId ? { ...question, isSolved: true } : question
            )
        );
    }, []);

    const handleNext = useCallback(() => {
        if (currentView === 'lesson') {
            setCurrentView('notes');
        } else if (currentView === 'notes') {
            setCurrentView('mcq');
            setCurrentMCQIndex(0);
        } else if (currentView === 'mcq') {
            const mcqLength = roadmapData.chapters[0].mcqQuestions?.length || 0;
            if (currentMCQIndex < mcqLength - 1) {
                setCurrentMCQIndex((prevIndex) => prevIndex + 1);
            } else {
                setCurrentView('coding');
                setCurrentCodingIndex(0);
            }
        } else if (currentView === 'coding') {
            setCurrentView('pyiq');
            setCurrentPYQIndex(0);
        } else if (currentView === 'pyiq') {
            const pyqLength = roadmapData.chapters[0].previousInterviewQuestions?.length || 0;
            if (currentPYQIndex < pyqLength - 1) {
                setCurrentPYQIndex((prevIndex) => prevIndex + 1);
            }
        }
    }, [currentView, currentLessonIndex, currentMCQIndex, currentCodingIndex, currentPYQIndex, roadmapData.chapters]);

    const handlePrevious = useCallback(() => {
        if (currentView === 'pyiq') {
            if (currentPYQIndex > 0) {
                setCurrentPYQIndex(currentPYQIndex - 1);
            } else {
                setCurrentView('coding');
                setCurrentCodingIndex((roadmapData.chapters[0].codingQuestions?.length || 0) - 1);
            }
        } else if (currentView === 'coding') {
            setCurrentView('mcq');
            setCurrentMCQIndex((roadmapData.chapters[0].mcqQuestions?.length || 0) - 1);
        } else if (currentView === 'mcq') {
            if (currentMCQIndex > 0) {
                setCurrentMCQIndex(currentMCQIndex - 1);
            } else {
                setCurrentView('notes');
            }
        } else if (currentView === 'notes') {
            setCurrentView('lesson');
        } else if (currentView === 'lesson') {
            if (currentLessonIndex > 0) {
                setCurrentLessonIndex(currentLessonIndex - 1);
            }
        }
    }, [currentView, currentLessonIndex, currentMCQIndex, currentCodingIndex, currentPYQIndex, roadmapData.chapters]);

    const renderLessonContent = useCallback(() => {
        return (
            <div className="h-100 overflow-hidden p-0">
                <iframe
                    className="w-100 h-100"
                    src={roadmapData.chapters[0].lesson?.video || ''}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ border: 'none' }}
                ></iframe>
            </div>
        );
    }, [roadmapData.chapters]);

    const LessonContent = useMemo(() => (
        <div className="d-flex flex-column flex-grow-1 me-3" style={{ height: '100%' }}>
            <div className="border border-dark rounded-2 h-75" >
                {renderLessonContent()}
            </div>
            <div className="my-2 text-end">
                        <button className="btn btn-sm btn-outline-secondry roadmap-button px-2 py-1 rounded-2 " onClick={handleNext}>
                            Next
                        </button>
            </div>
        </div>
    ), [handleNext, renderLessonContent]);

    const renderNotesContent = useCallback(() => {
        switch (contentType) {
            case 'notes':
                return (
                    <div className="h-100 overflow-auto p-3">
                        <h3 className="h5 mb-3">{roadmapData.chapters[0].notes?.notes?.title}</h3>
                        {roadmapData.chapters[0].notes?.notes?.sections.map((section, index) => (
                            <div key={index} className="mb-3">
                                <h4 className="h6 mb-2">{section.heading}</h4>
                                <p className="m-0" style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'pdf':
                return (
                    <iframe
                        src={selectedContent}
                        className="w-100 h-100"
                        title="PDF Viewer"
                        style={{ border: 'none' }}
                    />
                );
            case 'ppt':
                return (
                    <iframe
                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(selectedContent)}`}
                        className="w-100 h-100"
                        title="PPT Viewer"
                        style={{ border: 'none' }}
                    />
                );
            default:
                return null;
        }
    }, [contentType, selectedContent]);

    const NotesContent = useMemo(() => {
        const availableContentTypes = {
            notes: roadmapData.chapters[0].notes?.notes !== undefined,
            pdf: roadmapData.chapters[0].notes?.pdf !== undefined,
            ppt: roadmapData.chapters[0].notes?.ppt !== undefined
        };
    
        return (
            <div className="d-flex flex-column flex-grow-1 me-3" style={{ height: '100%' }}>
                <div className=" mb-3">
                    {availableContentTypes.notes && (
                        <button
                            className="px-3 btn btn-light border me-2 shadow-sm"
                            style={{ color: contentType === 'notes' ? '#0711FF' : '' }}
                            onClick={() => handleContentChange('notes')}
                        >
                            Notes
                        </button>
                    )}
                    {availableContentTypes.pdf && (
                        <button
                            className="px-3 btn btn-light border me-2 shadow-sm"
                            style={{ color: contentType === 'pdf' ? '#0711FF' : '' }}
                            onClick={() => handleContentChange('pdf')}
                        >
                            PDF
                        </button>
                    )}
                    {availableContentTypes.ppt && (
                        <button
                            className="px-3 btn btn-light border me-2 shadow-sm"
                            style={{ color: contentType === 'ppt' ? '#0711FF' : '' }}
                            onClick={() => handleContentChange('ppt')}
                        >
                            PPT
                        </button>
                    )}
                </div>
    
                <div className="border border-dark rounded-2 h-75 overflow-auto" >
                    {renderNotesContent()}
                </div>
    
                <div className="d-flex justify-content-between align-items-center my-2">
                <button className="btn btn-sm btn-outline-secondry roadmap-button px-2 py-1 rounded-2" onClick={handlePrevious}>
                            Previous
                        </button>
                        <button className="btn btn-sm btn-outline-secondry roadmap-button px-2 py-1 rounded-2" onClick={handleNext}>
                            Next
                        </button>
                </div>
            </div>
        );
    }, [contentType, renderNotesContent, handleNext, handleContentChange, roadmapData]);

    function handleSubmit(question: MCQQuestion) {
        const selectedAnswer = selectedAnswers[question.id];
        setAnsweredQuestions(new Set([...answeredQuestions, question.id]));

    }
    
    function handleAnswerSelect(questionId: number, optionId: string) {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
    }
    
    const MCQContent = useMemo(() => {
        const currentQuestion = roadmapData.chapters[0].mcqQuestions?.[currentMCQIndex];
    
        return (
            <div className="d-flex flex-grow-1" style={{ height: '100%' }}>
                <div className="d-flex flex-column align-items-center" style={{ width: '80px', marginLeft:"-20px"}}>
                    {roadmapData.chapters[0]?.mcqQuestions?.map((question, index) => {
                        const isActive = currentMCQIndex === index;
                        return (
                            <button
                                key={question.id}
                                className="btn border border-dark rounded-2 my-1 px-3 mx-auto"
                                style={{
                                    width: '50px',
                                    height: '55px',
                                    backgroundColor: isActive ? '#42FF58' : '#fff',
                                    color: isActive ? '#000' : '#000',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setCurrentMCQIndex(index)}
                            >
                                Q{index + 1}
                            </button>
                        );
                    })}
                </div>
                <div className="flex-grow-1 d-flex flex-column me-3" style={{ height: '100%' }}>
                    <div className="border border-dark rounded-2" style={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
                        <div className="border-bottom border-dark p-3 d-flex justify-content-between align-items-center">
                            <h5 className="m-0">Practice MCQs</h5>
                        </div>
                        <div className="p-3">
                            {currentQuestion && (
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div>{currentQuestion.id}. {currentQuestion.question}</div>
                                        <div>Score: {currentQuestion.score}</div>
                                    </div>
                                    <div className="row g-2">
                                        {currentQuestion.options.map((option) => {
                                            const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                                            const isSubmitted = answeredQuestions.has(currentQuestion.id);
                                            const isCorrect = option.id === currentQuestion.correctAnswer;

                                            let bgColor = '';
                                            // Before submission: grey highlight for selected option
                                            if (!isSubmitted) {
                                                bgColor = isSelected ? '#E0E0E0' : '';
                                            }
                                            // After submission: show correct/incorrect
                                            else {
                                                if (isSelected && !isCorrect) {
                                                    bgColor = '#FFC9C9'; // User's wrong selection
                                                } else if (isCorrect) {
                                                    bgColor = '#BAFFCE'; // Correct answer
                                                }
                                            }

                                            return (
                                                <div key={option.id} className="col-6 d-flex align-items-center">
                                                    <div className="me-2 mx-3">{option.id}.</div>
                                                    <button
                                                        className="btn text-center px-2 py-1 rounded-2 w-50 border border-dark"
                                                        style={{
                                                            backgroundColor: bgColor,

                                                        }}
                                                        onClick={() => {
                                                            if (!isSubmitted) {
                                                                handleAnswerSelect(currentQuestion.id, option.id);
                                                            }
                                                        }}
                                                        disabled={isSubmitted}
                                                    >
                                                        {option.text}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button
                                        className="btn btn-outline-secondry mt-3 roadmap-button"
                                        onClick={() => handleSubmit(currentQuestion)}
                                        disabled={!selectedAnswers[currentQuestion.id]}
                                    >
                                        Submit
                                    </button>

                                    {answeredQuestions.has(currentQuestion.id) && (
                                        <div className="mt-4 border rounded-2 p-2 border border" style={{ backgroundColor: 'white' }}>
                                            {/* <div className="mb-2">
                                                <strong>Your Answer:</strong> {currentQuestion.options.find(opt => opt.id === selectedAnswers[currentQuestion.id])?.text}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Correct Answer:</strong> {currentQuestion.options.find(opt => opt.id === currentQuestion.correctAnswer)?.text}
                                            </div> */}

                                            {currentQuestion.explanation && (
                                                <div className="">
                                                    <strong>Explanation:</strong>
                                                    <div>{currentQuestion.explanation}</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-sm btn-outline-secondry roadmap-button px-2 py-1 rounded-2" onClick={handlePrevious}>
                            Previous
                        </button>
                        <button className="btn btn-sm btn-outline-secondry roadmap-button px-2 py-1 rounded-2" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                </div>
            </div>

        );
    }, [currentMCQIndex, roadmapData.chapters[0].mcqQuestions, selectedAnswers, answeredQuestions, handleAnswerSelect, handleNext, handlePrevious, handleSubmit]);
    
    const PracticeCoding = useMemo(() => (
        <div className="flex-grow-1 me-3 d-flex flex-column" style={{ height: '100%' }}>
            <div className="border border-dark rounded-2" style={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
                <div className="border-bottom border-dark p-3">
                    <h5 className="m-0">Practice Coding</h5>
                </div>
                <div className="p-3">
                    {codingQuestionsState.map((question) => (
                        <div key={question.id} className="mb-4">
                            <div className="d-flex align-items-start justify-content-between">
                                <div className='d-flex flex-column'>
                                    <div className="d-flex align-items-start">
                                        <span className="me-2">{question.id}.</span>
                                        <span style={{ wordBreak: 'break-word' }}>{question.question}</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-5" style={{ minWidth: '275px' }}>
                                    <button
                                        className={`btn me-3`}
                                        style={{
                                            minWidth: '80px',
                                            backgroundColor: question.isSolved ? '#63F67E' : '#D4DCFF',
                                            border: '1px solid black',
                                            color: 'black',
                                        }}
                                        onClick={()=>navigate(navigateTo)}
                                    >
                                        {question.isSolved ? 'Solved' : 'Solve'}
                                    </button>
                                    <div className='me-3'>Score: {question.score}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-sm btn-outline-secondry roadmap-button px-2 py-1 rounded-2" onClick={handlePrevious}>
                            Previous
                        </button>
                        <button className="btn btn-sm btn-outline-secondry roadmap-button px-2 py-1 rounded-2" onClick={handleNext}>
                            Next
                        </button>
            </div>
        </div>
    ), [codingQuestionsState, handleNext, handlePrevious]);

    const PreviousInterviewQuestions = useMemo(() => (
        <div className="flex-grow-1 me-3 d-flex flex-column" style={{ height: '100%' }}>
            <div className="border border-dark rounded-2" style={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
                <div className="border-bottom border-dark p-3">
                    <h5 className="m-0">Previous Interview Questions</h5>
                </div>
                <div className="p-3">
                    {roadmapData.chapters[0].previousInterviewQuestions?.map((question) => (
                        <div key={question.id} className="mb-4">
                            <div className="d-flex align-items-start justify-content-between">
                                <div className='d-flex flex-column'>
                                    <div className="d-flex align-items-start">
                                        <span className="me-2 fs-5">{question.id}.</span>
                                        <span className="fs-5" style={{ wordBreak: 'break-word' }}>
                                            {question.question}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2" style={{ wordBreak: 'break-word' }}>
                                <strong>A.</strong> {question.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-sm btn-outline-secondry roadmap-button px-2 py-1 rounded-2" onClick={handlePrevious}>
                            Previous
                        </button>
            </div>
        </div>
    ), [roadmapData.chapters[0].previousInterviewQuestions, handlePrevious]);

    const SidebarComponent = useMemo(() => (
        <div className="border border-dark rounded-2 me-3 d-flex flex-column" style={{ width: '25%', height: '100%', flexShrink:0 }}>
            <div className="border-bottom border-dark">
                <div className="d-flex justify-content-between align-items-center px-3 py-2" style={{ cursor: "pointer"}}>
                    <h5 className="mb-0">Day {roadmapData.chapters[0].Day}: {roadmapData.chapters[0].title}</h5>
                    <span>{roadmapData.chapters[0].duration}</span>
                </div>
            </div>
            <div className="flex-grow-1 overflow-auto">
                {roadmapData.chapters.map((section, index) => (
                    <div key={index} className="border-bottom border-dark">
                        <div className="d-flex justify-content-between align-items-center px-3 py-2">
                            <span>{section.title}</span>
                            {(section.lesson || section.notes || section.mcqQuestions || section.codingQuestions || section.previousInterviewQuestions) ? (
                                <img
                                    src={expandhideIcon}
                                    alt="Expand/Hide"
                                    className="cursor-pointer"
                                    style={{
                                        width: "31px",
                                        height: "15px",
                                        transform: expandedSections.includes(index) ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    onClick={() => toggleSection(index)}
                                />
                            ) : (
                                <img
                                    src={expandhideIcon}
                                    alt="Expand/Hide"
                                    className="cursor-not-allowed"
                                    style={{
                                        width: "31px",
                                        height: "15px",
                                        opacity: 0.5
                                    }}
                                />
                            )}
                        </div>
                        {expandedSections.includes(index) && (section.lesson ||section.notes || section.mcqQuestions || section.codingQuestions || section.previousInterviewQuestions) && (
                            <div className="px-3 pb-2">
                                {section.lesson && (
                                    <div
                                        className="d-flex align-items-center mb-1 ms-3"
                                        style={{
                                            cursor: 'pointer',
                                            color: currentView === 'lesson' ? '#0711FF' : 'inherit'
                                        }}
                                        onClick={() => setCurrentView('lesson')}
                                    >
                                        <img src={lessonIcon} alt="Lesson" className="me-2" style={{ width: "20px", height: "28px" }} />
                                        <span>Lesson</span>
                                    </div>
                                )}
                                {section.notes && (
                                    <div
                                        className="d-flex align-items-center mb-1 ms-3"
                                        style={{
                                            cursor: 'pointer',
                                            color: currentView === 'notes' ? '#0711FF' : 'inherit'
                                        }}
                                        onClick={() => setCurrentView('notes')}
                                    >
                                        <img src={notesIcon} alt="Notes" className="me-2" style={{ width: "20px", height: "20px" }} />
                                        <span>Notes</span>
                                    </div>
                                )}
                                {section.mcqQuestions && (
                                    <div
                                        className="d-flex align-items-center mb-1 ms-3"
                                        style={{
                                            cursor: 'pointer',
                                            color: currentView === 'mcq' ? '#0711FF' : 'inherit'
                                        }}
                                        onClick={() => setCurrentView('mcq')}
                                    >
                                        <img src={mcqIcon} alt="Practice MCQs" className="me-2" style={{ width: "20px", height: "17px" }} />
                                        <span>Practice MCQs</span>
                                    </div>
                                )}
                                {section.codingQuestions && (
                                    <div
                                        className="d-flex align-items-center mb-1 ms-3"
                                        style={{
                                            cursor: 'pointer',
                                            color: currentView === 'coding' ? '#0711FF' : 'inherit'
                                        }}
                                        onClick={() => setCurrentView('coding')}
                                    >
                                        <img src={codingIcon} alt="Practice Codings" className="me-2" style={{ width: "16px", height: "29px" }} />
                                        <span>Practice Codings</span>
                                    </div>
                                )}
                                {section.previousInterviewQuestions && (
                                    <div
                                        className="d-flex align-items-center mb-1 ms-3"
                                        style={{
                                            cursor: 'pointer',
                                            color: currentView === 'pyiq' ? '#0711FF' : 'inherit'
                                        }}
                                        onClick={() => setCurrentView('pyiq')}
                                    >
                                        <img src={pyqIcon} alt="Previous Interview Questions" className="me-2" style={{ width: "18px", height: "22px" }} />
                                        <span>Previous Interview Questions</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    ), [roadmapData.chapters, expandedSections, toggleSection, currentView]);

    return (
        <div className='container-fluid p-0' style={{ height: '100vh', maxWidth: '100%', overflowX: 'hidden', overflowY: 'auto', backgroundColor: '#f2eeee' }}>
            <Sidebar />
            <div className="p-0 my-0 me-2" style={{ backgroundColor: "#F2EEEE", marginLeft: "70px" }}>
                <div className="container-fluid bg-white border rounded-1  p-3 d-flex justify-content-between">
                    <span className="text-center fs-6">
                        <img
                            src={backIcon}
                            alt="Back btn"
                            className="me-1"
                            onClick={() => navigate(-1)}
                        />{" "}
                        Day 1
                    </span>
                    <span className="">
                        {" "}
                        <img
                            className="me-3"
                            src={Notification}
                            alt="Notification"
                        />{" "}
                        <img className="me-2" src={User} alt="User" />
                    </span>
                </div>
                <div className="container-fluid p-0 pt-3" style={{maxWidth: "100%", overflowX: "hidden", overflowY: "auto", backgroundColor: "#f2eeee"}}>
                    <div className='row g-2'>
                        <div className='col-12'>
                            <div className="bg-white border rounded-2 py-3 ps-3" style={{ height: 'calc(100vh - 100px)', overflowY: "auto" }}>
                                <div className="d-flex h-100">
                                    {currentView === 'lesson' ? LessonContent : currentView === 'notes' ? NotesContent :currentView === 'mcq' ? MCQContent : currentView === 'coding' ? PracticeCoding : currentView === 'pyiq' ? PreviousInterviewQuestions : NotesContent}
                                    {SidebarComponent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SubjectRoadMap;