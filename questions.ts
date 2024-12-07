// Define the structure of a quiz question
interface QuizQuestion {
    id: number;
    question: string;
    options: {
        a: string;
        b: string;
        c: string;
        d: string;
    };
    correctAnswer: "a" | "b" | "c" | "d";
    explanation: string;
}

// Array of Node.js quiz questions
const nodejsQuizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "When does Node.js use thread pools for I/O operations?",
        options: {
            a: "Only for file system operations",
            b: "For cryptographic operations, file system, and some DNS lookups",
            c: "Never uses thread pools",
            d: "Only for network operations",
        },
        correctAnswer: "b",
        explanation:
            "Node.js uses thread pools (specifically the libuv thread pool) for operations that are not efficiently handled by the event loop, such as certain file system operations, cryptographic operations, and some DNS lookups.",
    },
    {
        id: 2,
        question:
            "What method has replaced os.cpus().length for determining available parallelism in Node.js?",
        options: {
            a: "os.availableParallelism()",
            b: "os.threads()",
            c: "os.cpuCount()",
            d: "process.availableCpus()",
        },
        correctAnswer: "a",
        explanation:
            "In newer versions of Node.js, os.availableParallelism() is the recommended method to get the number of logical CPU cores available for parallel processing, replacing the older os.cpus().length approach.",
    },
    {
        id: 3,
        question: "What is the primary purpose of the event loop in Node.js?",
        options: {
            a: "To run all JavaScript code in parallel",
            b: "To manage asynchronous operations and callbacks",
            c: "To allocate memory for variables",
            d: "To compile TypeScript code",
        },
        correctAnswer: "b",
        explanation:
            "The event loop is central to Node.js's non-blocking I/O model, allowing it to perform non-blocking operations by offloading operations to the system kernel whenever possible.",
    },
    {
        id: 4,
        question:
            "Which Node.js global object provides access to command-line arguments?",
        options: {
            a: "process.env",
            b: "global.args",
            c: "process.argv",
            d: "system.arguments",
        },
        correctAnswer: "c",
        explanation:
            "process.argv is an array containing the command-line arguments. The first element is the path to the Node.js executable, the second is the path to the JavaScript file being executed, and subsequent elements are additional command-line arguments.",
    },
    {
        id: 5,
        question: "What does the '--inspect' flag do in Node.js?",
        options: {
            a: "Enables strict mode",
            b: "Activates performance profiling",
            c: "Launches the Chrome DevTools debugger",
            d: "Checks for syntax errors",
        },
        correctAnswer: "c",
        explanation:
            "The '--inspect' flag allows developers to debug Node.js applications using Chrome DevTools, providing a powerful way to inspect and debug Node.js applications.",
    },
    {
        id: 6,
        question:
            "Which module in Node.js is primarily used for creating HTTP servers?",
        options: {
            a: "http",
            b: "server",
            c: "network",
            d: "web",
        },
        correctAnswer: "a",
        explanation:
            "The 'http' module provides functionality to create HTTP servers and make HTTP requests, forming the basis of many web applications in Node.js.",
    },
    {
        id: 7,
        question:
            "What is the purpose of the worker_threads module in Node.js?",
        options: {
            a: "To manage web workers",
            b: "To create and manage separate threads for CPU-intensive tasks",
            c: "To handle routing in web applications",
            d: "To manage database connections",
        },
        correctAnswer: "b",
        explanation:
            "The worker_threads module allows Node.js to create and manage separate threads, enabling true parallel processing for CPU-intensive operations that might block the main event loop.",
    },
    {
        id: 8,
        question: "What does the 'Buffer' class in Node.js primarily handle?",
        options: {
            a: "Network buffering",
            b: "Raw binary data",
            c: "Temporary file storage",
            d: "Memory caching",
        },
        correctAnswer: "b",
        explanation:
            "The Buffer class is used to handle raw binary data directly, allowing manipulation of binary information outside of the V8 heap.",
    },
    {
        id: 9,
        question: "Which method is used to create a new Promise in Node.js?",
        options: {
            a: "new Promise()",
            b: "Promise.create()",
            c: "Promise.resolve()",
            d: "Promise.new()",
        },
        correctAnswer: "a",
        explanation:
            "The 'new Promise()' constructor is used to create a new Promise, taking an executor function with resolve and reject parameters.",
    },
    {
        id: 10,
        question: "What is the primary use of the 'cluster' module in Node.js?",
        options: {
            a: "To manage cloud deployments",
            b: "To create a cluster of databases",
            c: "To enable load balancing across multiple CPU cores",
            d: "To manage microservices",
        },
        correctAnswer: "c",
        explanation:
            "The cluster module allows Node.js to create child processes that all share server ports, enabling better utilization of multi-core systems and improving application performance.",
    },
];

function checkAnswer(
    questionId: number,
    selectedOption: "a" | "b" | "c" | "d",
): {
    isCorrect: boolean;
    explanation: string;
} {
    // Find the question by ID
    const question = nodejsQuizQuestions.find((q) => q.id === questionId);

    // If question not found, return error
    if (!question) {
        return {
            isCorrect: false,
            explanation: "Question not found",
        };
    }

    // Check if the selected option matches the correct answer
    const isCorrect = question.correctAnswer === selectedOption;

    return {
        isCorrect,
        explanation: question.explanation,
    };
}

// Bonus function to get a random question
function getRandomQuestion(): QuizQuestion {
    const randomIndex = Math.floor(Math.random() * nodejsQuizQuestions.length);
    return nodejsQuizQuestions[randomIndex];
}

export { checkAnswer, getRandomQuestion, nodejsQuizQuestions };
export type { QuizQuestion };
