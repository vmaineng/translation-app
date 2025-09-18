import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AudioControls } from "./AudioControls";
import "@testing-library/jest-dom";

jest.mock('react-icons/fa', () => ({
    FaMicrophone: () => <
}))