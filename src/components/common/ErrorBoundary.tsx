import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography } from '@mui/material'

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Unhandled error', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100px">
                    <Typography variant="h4">
                        Something went wrong.
                    </Typography>
                    <Typography variant="body1">
                        {this.state.error?.message}
                    </Typography>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;